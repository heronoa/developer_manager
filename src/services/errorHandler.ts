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

export const formErrorsHandler = (
  email: string,
  password: string,
): string | null => {
  if (password?.length < 6) {
    return "As senhas tem no mínimo 6 caracteres";
  }
  return null;
};

export const stringVerifier = (array: string[], strings: string[]) => {
  return strings.every(string => array.includes(string));
};
