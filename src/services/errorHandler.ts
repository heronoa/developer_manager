export const firebaseAuthErrorsHandler = (message: string):string => {
  return {
    INVALID_LOGIN_CREDENTIALS: "Credenciais Não Encontradas",
    TOO_MANY_ATTEMPTS_TRY_LATER: "Muitas Tentativas tente novamente mais tarde",
  }?.[message.split(" ")[0]] || "Unknown Error";
};

export const formErrorsHandler = (email: string, password: string): string | null => {
    if (password.length < 6) {
        return "As senhas tem no mínimo 6 caracteres"
    }
    return null
}
