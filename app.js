// ============================================
// UTILITYKING MINI APP - 10 TOOLS IN 1
// ============================================

const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.('#0f0f1e');
    tg.setBackgroundColor?.('#0f0f1e');
}

const user = tg?.initDataUnsafe?.user || {};
document.getElementById('userName').textContent = user.first_name ? `👤 ${user.first_name}` : '👤 Guest';

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
    tg?.HapticFeedback?.notificationOccurred('success');
}

const homeScreen = document.getElementById('homeScreen');
const headerTitle = document.getElementById('headerTitle');
const backBtn = document.getElementById('backBtn');

document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        const tool = card.dataset.tool;
        openTool(tool);
    });
});

function openTool(tool) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const toolScreen = document.getElementById(`tool-${tool}`);
    if (toolScreen) {
        toolScreen.classList.add('active');
        headerTitle.textContent = toolScreen.querySelector('h2').textContent;
        backBtn.classList.remove('hidden');
    }
}

backBtn.addEventListener('click', () => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    homeScreen.classList.add('active');
    headerTitle.textContent = 'UtilityKing';
    backBtn.classList.add('hidden');
});

// QR Code
const qrInput = document.getElementById('qrInput');
const qrResult = document.getElementById('qrResult');
const qrDownload = document.getElementById('qrDownload');

document.getElementById('qrGenerate').addEventListener('click', () => {
    const text = qrInput.value.trim();
    if (!text) return showToast('Enter some text');
    qrResult.innerHTML = '';
    const canvas = document.createElement('canvas');
    qrResult.appendChild(canvas);
    QRCode.toCanvas(canvas, text, { width: 220, margin: 2 }, (err) => {
        if (err) return showToast('Error generating QR');
        qrDownload.classList.remove('hidden');
        showToast('QR generated!');
    });
});

qrDownload.addEventListener('click', () => {
    const canvas = qrResult.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
    showToast('Downloaded!');
});

// Password
const pwdLen = document.getElementById('pwdLen');
const pwdLenVal = document.getElementById('pwdLenVal');
const pwdOutput = document.getElementById('pwdOutput');

pwdLen.addEventListener('input', () => pwdLenVal.textContent = pwdLen.value);

document.getElementById('pwdGenerate').addEventListener('click', () => {
    const len = parseInt(pwdLen.value);
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';
    const sym = '!@#$%^&*()_