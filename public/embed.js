(function () {
  const config = window.cryptoCoffeeConfig;
  // Create the donation button
  const btn = document.createElement('button');
  btn.innerText = config.text;
  
  btn.style.padding = config.size === 'lg' ? '12px 20px' : '8px 14px';
  btn.style.background = config.color;
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '8px';
  btn.style.cursor = 'pointer';
  btn.style.zIndex = 9999;

  // Create the modal container
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.display = 'none';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = 9998;

  // Create the modal content (iframe)
  const iframe = document.createElement('iframe');
  iframe.src = `https://fundhog-page.vercel.app/${encodeURIComponent(config.recipientAddress)}`;
  iframe.style.width = '400px';
  iframe.style.height = '550px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
  iframe.allowTransparency = true;
  iframe.loading = 'lazy';

  // Add close behavior
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Show modal on click
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  modal.appendChild(iframe);
  document.body.appendChild(modal);
  document.body.appendChild(btn);
})();