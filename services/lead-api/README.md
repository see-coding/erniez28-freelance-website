# Lead API

Small self-hosted contact endpoint for erniez28.de. It accepts only an explicit
request for a reply or callback. Submitted details are encrypted in a SQLite
outbox and removed from the payload column after SMTP accepts the notification.
The recipient’s mailbox then follows its own retention policy. Logs contain
event names, short request references and SMTP error codes, never the message.

## Run locally

Copy `.env.example` to `.env`, use a unique random 32-byte Base64 encryption
key, and set SMTP values for a test mailbox. Do not use production SMTP for a
test submission. Run `npm ci`, then `npm start` (loads the local `.env`). The endpoint listens on
`http://127.0.0.1:8788/api/anfrage`; the website must be configured with
`PUBLIC_LEAD_API_URL=http://127.0.0.1:8788/api/anfrage` and the matching
`PUBLIC_ORIGIN` before the browser can send a request.

## VPS deployment requirements

1. Create an `A` record for `api.erniez28.de` pointing to the VPS address.
2. Copy this directory to `/opt/stacks/website-lead-api` on the VPS.
3. Create its private `.env` from `.env.example`; set a site-specific SMTP
   sender and password. Do not reuse Cal.com’s SMTP credential.
4. Run `docker compose up -d --build`. The service joins the existing `proxy`
   network and Traefik requests its TLS certificate.
5. Configure the website build with
   `PUBLIC_LEAD_API_URL=https://api.erniez28.de/api/anfrage`.
6. Check the internal container `/healthz`, the container logs and a test-mail round trip before the
   endpoint is used by real visitors.

The service has no published host port. Traefik routes only the API path.
The health endpoint is intentionally not exposed by the public router.
The volume is persistent and should be included in encrypted VPS backups.
Backups contain encrypted message payloads; the encryption key must be stored
separately and restored before pending messages can be delivered.

## Data handling

The service keeps encrypted requests only while they are queued for delivery.
After SMTP accepts a message, it clears the message payload and retains a
non-identifying delivery state. Retry attempts are bounded; permanent SMTP
failure clears the payload and logs a reference for server-side follow-up.
The configured mailbox still contains the delivered request. Agree the final
retention and deletion practice and reflect it in the public privacy notice
before launch.
