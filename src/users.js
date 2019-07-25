export const allUsers = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐒",
  "🦇",
  "🦉",
  "🦅",
  "🦆",
  "🐦",
  "🐧",
  "🐔",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐜",
  "🐢"
].map((emoji, idx) => ({
  id: idx,
  name: emoji
}))

export function getCurrentUser() {
  // picks a random user, and stores it on the session storage to preserve identity during hot reloads
  const currentUserId = sessionStorage.getItem("user") || Math.round(Math.random() * (allUsers.length - 1))
  sessionStorage.setItem("user", currentUserId)
  return allUsers[parseInt(currentUserId)]
}
