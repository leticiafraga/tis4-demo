import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Input from "../../components/input/Input";
import useAuth from "../../hooks/useAuth";
import { LoginRequest, loginSchema } from "../../requests/LoginRequest";
import style from "./login.module.scss";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  async function handleSuccess(data: LoginRequest) {
    const success = await auth.login(data);

    if (success) navigate("/list");
    setError("email", { type: "custom", message: "invalid credentials" });
    setError("password", { type: "custom", message: "invalid credentials" });
  }

  return (
    <div className={style.containerLogin}>
      <Card>
        <h1 className="text-center">TIS 4 demo</h1>
        <hr />
        <form onSubmit={handleSubmit(handleSuccess)}>
          <Input
            label={"E-mail:"}
            {...register("email")}
            error={!!errors.email}
          />
          <Input
            label={"Senha:"}
            type="password"
            {...register("password")}
            error={!!errors.password}
          />
          <Button className="btn btn-primary" type="submit">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}
