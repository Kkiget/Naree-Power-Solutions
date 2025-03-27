import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailTemplate = 'profile-update' | 'password-change' | 'new-session' | 'security-alert';

const templates: Record<EmailTemplate, (data: any) => { subject: string; html: string }> = {
  'profile-update': (data) => ({
    subject: 'Your Naree Power Solutions profile has been updated',
    html: `
      <h1>Profile Update Confirmation</h1>
      <p>Hello ${data.name},</p>
      <p>Your profile information has been updated:</p>
      <ul>
        ${data.changes.map((change: string) => `<li>${change}</li>`).join('')}
      </ul>
      <p>If you did not make these changes, please contact support immediately.</p>
    `,
  }),
  'password-change': (data) => ({
    subject: 'Your password has been changed',
    html: `
      <h1>Password Change Confirmation</h1>
      <p>Hello ${data.name},</p>
      <p>Your password was recently changed.</p>
      <p>Time: ${new Date().toLocaleString()}</p>
      <p>Location: ${data.location}</p>
      <p>Device: ${data.device}</p>
      <p>If you did not make this change, please secure your account immediately.</p>
    `,
  }),
  'new-session': (data) => ({
    subject: 'New login detected',
    html: `
      <h1>New Login Alert</h1>
      <p>Hello ${data.name},</p>
      <p>A new login was detected on your account:</p>
      <ul>
        <li>Time: ${data.time}</li>
        <li>Location: ${data.location}</li>
        <li>Device: ${data.device}</li>
        <li>IP Address: ${data.ip}</li>
      </ul>
      <p>If this wasn't you, please secure your account immediately.</p>
    `,
  }),
  'security-alert': (data) => ({
    subject: 'Security Alert - Action Required',
    html: `
      <h1>Security Alert</h1>
      <p>Hello ${data.name},</p>
      <p>${data.message}</p>
      <p>Time: ${data.time}</p>
      <p>Location: ${data.location}</p>
      <p>If you did not initiate this action, please contact support immediately.</p>
    `,
  }),
};

export async function sendEmail(
  to: string,
  template: EmailTemplate,
  data: any
) {
  const { subject, html } = templates[template](data);

  return resend.emails.send({
    from: 'Naree Power Solutions <security@nareepowersolutions.com>',
    to,
    subject,
    html,
  });
}
