import * as S from "./styles";

const Button = ({ color, width, children, onClick, disabled = false }) => (
  <S.Button color={color} width={width} onClick={onClick} disabled={disabled}>
    {children}
  </S.Button>
);

export default Button;
