/**
 * Minimal auth for board members. Board emails are set in env BOARD_MEMBER_EMAILS
 * (comma-separated, no spaces), e.g. BOARD_MEMBER_EMAILS=president@club.com,sec@club.com
 */

function getBoardMemberEmails(): string[] {
  const raw = process.env.BOARD_MEMBER_EMAILS;
  if (!raw?.trim()) return [];
  return raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export function isBoardMemberEmail(email: string | undefined): boolean {
  if (!email) return false;
  const allowlist = getBoardMemberEmails();
  if (allowlist.length === 0) return false;
  return allowlist.includes(email.toLowerCase());
}

export { getBoardMemberEmails };
