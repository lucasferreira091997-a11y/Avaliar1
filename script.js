// Substitua "SUA_PUBLIC_KEY_AQUI" pela sua Public Key do EmailJS (Menu Account -> Public Key)
emailjs.init"service_dfz5feh";

const form = document.getElementById('feedbackForm');
const commentBox = document.getElementById('comment');
const counter = document.getElementById('counter');
const submitBtn = document.getElementById('submitBtn');

// Contador de caracteres do comentário
commentBox.addEventListener('input', () => {
  counter.textContent = 140 - commentBox.value.length;
});

// Envio do formulário via EmailJS
form.addEventListener('submit', function (e) {
  e.preventDefault();

  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  const selectedRating = document.querySelector('input[name="rating"]:checked').value;

  const templateParams = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    rating: selectedRating,
    message: commentBox.value || 'Nenhum comentário enviado.'
  };

  // Envio usando o seu Service ID configurado: service_dfz5feh
  // Substitua "SEU_TEMPLATE_ID_AQUI" pelo ID do seu Template
  emailjs.send('service_dfz5feh', "template_n8a61os", templateParams)
    .then(() => {
      alert('Obrigado! Sua avaliação foi enviada com sucesso.');
      form.reset();
      counter.textContent = '140';
    })
    .catch((error) => {
      alert('Ocorreu um erro ao enviar sua avaliação. Verifique as chaves e tente novamente.');
      console.error('Erro EmailJS:', error);
    })
    .finally(() => {
      submitBtn.textContent = 'Enviar avaliação';
      submitBtn.disabled = false;
    });
});