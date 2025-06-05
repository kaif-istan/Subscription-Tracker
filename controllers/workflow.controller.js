import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subscription from '../models/subscription.model.js';

// This file contains the workflow for setting reminders for subscription renewals.
// It uses the Upstash Workflow service to manage the workflow logic.

const REMINDERS = [7, 5, 3, 1]; // Days before renewal to send reminders

export const sendReminders = serve({
  sendReminders: async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') {
      return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
      console.log(`No reminders set for past renewal date: ${renewalDate.format('YYYY-MM-DD')}`);
      return;
    }

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day');

      if (reminderDate.isAfter(dayjs())) {
        await sleepUntilReminder(context, `Reminder ${daysBefore} days before renewal`, reminderDate.toDate());
        await triggerReminder(context, `Reminder ${daysBefore} days before renewal`);
      }
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date.toISOString()}`);
  await context.sleepUntil(label, date);
  console.log(`Woke up for ${label} reminder at ${new Date().toISOString()}`);
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
  });
};
