export default function validUserBody() {
  const body: { email: string; password: string; confirmPassword?: string } = {
    email: "admin@gmail.com",
    password: "1234567890",
  };
  return body;
}
