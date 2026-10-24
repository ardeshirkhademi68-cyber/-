const knowledge = [
  { terms: ["سلام", "درود", "خوبی"], answer: "درود، خوش آمدید! من هم‌صحبت ریژاو هستم و با خوشحالی درباره مسیر فرهنگی، هنری و تاریخی پروژه راهنمایی‌تان می‌کنم." },
  { terms: ["ریژاو چیست", "درباره ریژاو", "معرفی"], answer: "ریژاو بستری برای زنده نگه‌داشتن روایت‌های فرهنگی، هنرهای بومی و حافظه تاریخی است؛ جایی برای دیدن، شنیدن و گفت‌وگو درباره میراث مشترک‌مان." },
  { terms: ["بازدید", "ساعت", "برنامه", "کجا"], answer: "برای برنامه‌ریزی بازدید، ابتدا بخش رویدادهای جاری را بررسی کنید. پیشنهاد می‌کنم پیش از مراجعه، روز و ساعت مدنظر خود را با دبیرخانه پروژه هماهنگ کنید." },
  { terms: ["رویداد", "نمایشگاه", "هنر", "کارگاه"], answer: "در ریژاو، نمایشگاه‌ها، نشست‌های گفت‌وگو و کارگاه‌های هنری برگزار می‌شود. برای دیدن تازه‌ترین برنامه‌ها، صفحه رویدادهای پروژه را دنبال کنید." },
  { terms: ["تاریخ", "میراث", "قدیمی", "داستان"], answer: "تاریخ در ریژاو فقط مجموعه‌ای از تاریخ‌ها نیست؛ روایت آدم‌ها، مکان‌ها و آیین‌هاست. اگر نام یک مکان یا دوره را بگویید، پرسش‌تان را دقیق‌تر دنبال می‌کنیم." },
  { terms: ["همکاری", "مشارکت", "داوطلب", "پیشنهاد"], answer: "از همراهی پژوهشگران، هنرمندان و دوست‌داران فرهنگ استقبال می‌کنیم. ایده یا زمینه همکاری خود را با دبیرخانه پروژه در میان بگذارید." },
];

export function replyFor(message) {
  const normalized = message.trim().toLowerCase().replaceAll("ي", "ی").replaceAll("ك", "ک");
  const entry = knowledge.find(({ terms }) => terms.some((term) => normalized.includes(term)));
  return entry?.answer ?? "پرسش ارزشمندی است. برای پاسخ دقیق‌تر، لطفاً نام مکان، رویداد یا موضوع فرهنگی موردنظرتان را کمی بیشتر توضیح دهید.";
}

if (typeof document !== "undefined") {
  const conversation = document.querySelector("#conversation");
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#message");
  const suggestions = document.querySelector("#suggestions");

  function currentTime() { return new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit" }).format(new Date()); }
  function addMessage(text, role) {
    const item = document.createElement("article"); item.className = `message ${role}`;
    const avatar = role === "bot" ? '<span class="avatar" aria-hidden="true">ر</span>' : "";
    item.innerHTML = `${avatar}<div class="bubble">${text}<time class="time">${currentTime()}</time></div>`;
    conversation.append(item); conversation.scrollTop = conversation.scrollHeight;
  }
  function showTyping() { const node = document.createElement("div"); node.className = "message bot typing"; node.id = "typing"; node.innerHTML = '<span class="avatar">ر</span><div class="bubble"><span></span><span></span><span></span></div>'; conversation.append(node); conversation.scrollTop = conversation.scrollHeight; }
  function send(text) { const clean = text.trim(); if (!clean) return; addMessage(clean, "user"); input.value = ""; showTyping(); window.setTimeout(() => { document.querySelector("#typing")?.remove(); addMessage(replyFor(clean), "bot"); }, 550); }
  function welcome() { conversation.replaceChildren(); addMessage("سلام! خوش آمدید به ریژاو. دوست دارید درباره تاریخ، هنر، رویدادها یا بازدید بیشتر بدانید؟", "bot"); }

  form.addEventListener("submit", (event) => { event.preventDefault(); send(input.value); });
  suggestions.addEventListener("click", (event) => { if (event.target.matches("button")) send(event.target.textContent); });
  document.querySelector("#reset-chat").addEventListener("click", welcome);
  welcome();
}
