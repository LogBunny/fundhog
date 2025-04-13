const sizeStyles = {
  sm: { padding: '8px 12px', fontSize: '14px' },
  md: { padding: '12px 20px', fontSize: '16px' },
  lg: { padding: '16px 32px', fontSize: '18px' },
};

const radiusStyles = {
  none: '0px',
  sm: '2px',
  md: '6px',
  full: '9999px',
};

(function () {
  const config = window.cryptoCoffeeConfig;
  
  // Create the donation button
  const btn = document.createElement('button');
  btn.innerText = config.text;
  
  // Apply size styles
  const size = sizeStyles[config.size] || sizeStyles.md; // Default to md if size is invalid
  btn.style.padding = size.padding;
  btn.style.fontSize = size.fontSize;
  
  // Apply radius styles
  const radius = radiusStyles[config.radius] || radiusStyles.md; // Default to md if radius is invalid
  btn.style.borderRadius = radius;
  
  // Apply other styles
  btn.style.background = config.color;
  btn.style.color = '#fff';
  btn.style.borderStyle = 'solid';
  btn.style.borderWidth = '4px';
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
  iframe.src = `https://www.fundhog.xyz/${encodeURIComponent(config.recipientAddress)}`;
  iframe.style.width = '400px';
  iframe.style.height = '700px';
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
  const cryptoDiv = document.getElementById("crypto-coffee-button");
  if(!cryptoDiv){
    console.log("crypto-coffee-button not found, Please look at the docs!")
    return;
  }
  cryptoDiv.appendChild(btn);
})();