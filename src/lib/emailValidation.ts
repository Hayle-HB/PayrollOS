// List of disallowed personal, free, temporary, and common typo email domains
const BLOCKED_DOMAINS = new Set([
  // Google / Gmail & common typos
  "gmail.com",
  "googlemail.com",
  "gmadil.com",
  "gmaill.com",
  "gmal.com",
  "gmai.com",
  "gmial.com",
  "gmaii.com",
  "gmil.com",
  "gmaild.com",
  "gamil.com",
  "gmail.co",
  "gmail.org",
  "gmail.net",
  
  // Yahoo & typos
  "yahoo.com",
  "ymail.com",
  "rocketmail.com",
  "yaho.com",
  "yahou.com",
  "yahooo.com",
  "yahoo.co.uk",
  "yahoo.ca",

  // Microsoft / Hotmail / Outlook & typos
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "passport.com",
  "windowslive.com",
  "hotmial.com",
  "hotmai.com",
  "hotmaill.com",
  "outlok.com",
  "outloo.com",
  "outlock.com",

  // Apple
  "icloud.com",
  "me.com",
  "mac.com",
  "iclou.com",
  "icld.com",

  // Other free / personal providers
  "aol.com",
  "aim.com",
  "mail.com",
  "email.com",
  "zoho.com",
  "proton.me",
  "protonmail.com",
  "protonmail.ch",
  "tutanota.com",
  "tuta.io",
  "gmx.com",
  "gmx.net",
  "fastmail.com",
  "yandex.com",
  "yandex.ru",
  "inbox.com",
  "rediffmail.com",
  "hushmail.com",
  "10minutemail.com",
  "tempmail.com",
  "guerrillamail.com",
  "trashmail.com",
]);

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  domain?: string;
  companyName?: string;
}

export function validateCorporateEmail(email: string): EmailValidationResult {
  if (!email || !email.trim()) {
    return { isValid: false, error: "Please enter your corporate work email." };
  }

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid work email format (e.g. name@company.com)." };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: "Invalid email format." };
  }

  const domain = parts[1].toLowerCase();

  // Check against blocked personal / typo domains
  if (BLOCKED_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: `Personal email domain detected (@${domain}). Please provide a corporate work email (e.g. name@yourcompany.com).`,
      domain,
    };
  }

  // Also check if domain contains common personal keywords
  if (
    domain.startsWith("gmail.") ||
    domain.startsWith("yahoo.") ||
    domain.startsWith("hotmail.") ||
    domain.startsWith("outlook.") ||
    domain.startsWith("icloud.")
  ) {
    return {
      isValid: false,
      error: `Personal email domain detected (@${domain}). Please provide a corporate work email (e.g. name@yourcompany.com).`,
      domain,
    };
  }

  // Derive suggested company name from domain (e.g. vancetech.io -> Vancetech)
  const domainBase = domain.split(".")[0];
  const companyName = domainBase.charAt(0).toUpperCase() + domainBase.slice(1);

  return {
    isValid: true,
    domain,
    companyName,
  };
}
