export const validarCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma1 = 0;
  for (let i = 0; i < 9; i++) {
    soma1 += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digito1 = 11 - (soma1 % 11);
  if (digito1 >= 10) {
    digito1 = 0;
  }
  if (parseInt(cpf.charAt(9)) !== digito1) {
    return false;
  }

  let soma2 = 0;
  for (let i = 0; i < 10; i++) {
    soma2 += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let digito2 = 11 - (soma2 % 11);
  if (digito2 >= 10) {
    digito2 = 0;
  }
  if (parseInt(cpf.charAt(10)) !== digito2) {
    return false;
  }

  return true;
};
