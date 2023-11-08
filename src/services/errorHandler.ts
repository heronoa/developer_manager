import { validarCPF } from "./textValidation";

export const firebaseAuthErrorsHandler = (message: string): string => {
  return (
    {
      INVALID_LOGIN_CREDENTIALS: "Credenciais Não Encontradas",
      TOO_MANY_ATTEMPTS_TRY_LATER:
        "Muitas Tentativas tente novamente mais tarde",
      MISSING_EMAIL: "Por favor, preencha o campo de email",
    }?.[message?.split(" ")?.[0]] || "Erro Desconhecido"
  );
};

interface args {
  [key: string]: any;
}

export const formErrorsHandler = ({
  email,
  password,
  cadastroDePessoaFisica,
  contato,
}: args): string | null => {
  if (password && password.length < 6) {
    return "As senhas tem no mínimo 6 caracteres";
  }
  if (contato && contato.length < 11) {
    return "O contato precisar ter 11 numeros contando com o DDD";
  }
  if (cadastroDePessoaFisica && cadastroDePessoaFisica.length !== 11) {
    return "CPF precisa ter no minimo 11 digitos";
  }
  if (cadastroDePessoaFisica && !validarCPF(cadastroDePessoaFisica)) {
    return "CPF inválido";
  }
  return null;
};

export const stringVerifier = (array: string[], strings: string[]) => {
  return strings.every(string => array.includes(string));
};
