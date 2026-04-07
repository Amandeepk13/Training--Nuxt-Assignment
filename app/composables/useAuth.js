export const useAuth = () => {

  const { fetch: refreshSession } = useUserSession()

  const login = async (name, email) => {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        name,
        email
      },
    });
    await refreshSession();
    await navigateTo("/");
  };

  return { login };
};
