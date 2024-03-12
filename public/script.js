document.addEventListener('DOMContentLoaded', () => {
    const shortenBtn = document.getElementById('shortenBtn');
    const originalUrlInput = document.getElementById('originalUrl');
    const shortenedUrlDiv = document.getElementById('shortenedUrl');
    const copyBtn = document.getElementById('copyBtn');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
  
    shortenBtn.addEventListener('click', async () => {
      const originalUrl = originalUrlInput.value;
      if (!isValidUrl(originalUrl)) {
        showError('Please enter a valid URL');
        return;
      }
      
      showLoading();
      try {
        const response = await fetch('/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ originalUrl })
        });
        const data = await response.json();
        shortenedUrlDiv.innerHTML = `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
        copyBtn.style.display = 'inline';
        hideError();
      } catch (error) {
        showError('Failed to shorten URL. Please try again.');
      } finally {
        hideLoading();
      }
    });
  
    copyBtn.addEventListener('click', () => {
      const shortenedUrl = shortenedUrlDiv.querySelector('a').textContent;
      const tempInput = document.createElement('input');
      tempInput.value = shortenedUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Link copied to clipboard!');
    });
  
    function isValidUrl(url) {
      // Simple URL validation, you can enhance it further
      const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return pattern.test(url);
    }
  
    function showError(message) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
    }
  
    function hideError() {
      errorDiv.style.display = 'none';
    }
  
    function showLoading() {
      loadingDiv.style.display = 'block';
    }
  
    function hideLoading() {
      loadingDiv.style.display = 'none';
    }
  });
  