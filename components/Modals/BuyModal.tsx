import React, { useState } from 'react';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import { useMintDetails } from 'hooks/useMintDetails';
import * as St from './Modals.styled';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  payWithCard: boolean;
  isDiscount: boolean;
  handleCryptoMint: (quantity: number) => void;
  handleError: (error: string) => void;
}

const BuyModal: React.FC<Props> = ({
  setShowModal,
  payWithCard,
  isDiscount,
  handleCryptoMint,
  handleError,
}) => {
  const { mintPrice, maxMint, discountPrice } = useMintDetails();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(mintPrice.toFixed(2));

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCardMint = (quantity: number) => {
    handleError('Card minting not yet implemented');
  };

  const minMint = 1;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= minMint && newQuantity <= maxMint) {
      setQuantity(newQuantity);
      setTotal((newQuantity * mintPrice).toFixed(2));
    }
  };

  return (
    <>
      <St.BuyModalBackground onClick={handleCloseModal} />
      <St.BuyModalContainer>
        <St.MsgDiv>
          <St.Text>CHOOSE QUANTITY</St.Text>
          <St.XButton src="/icons/x-icon-lg.svg" onClick={handleCloseModal} />
        </St.MsgDiv>
        <St.MsgDiv>
          <St.Text>MAX: {maxMint}</St.Text>
          <St.Text>PRICE: {isDiscount ? discountPrice : mintPrice}E</St.Text>
          <St.Text>TOTAL: {total}E</St.Text>
        </St.MsgDiv>
        {!isDiscount && (
          <St.PlusMinusDiv>
            <St.PlusMinusButton
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </St.PlusMinusButton>
            <St.Text>{quantity}</St.Text>
            <St.PlusMinusButton
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </St.PlusMinusButton>
          </St.PlusMinusDiv>
        )}
        <St.Button
          onClick={
            payWithCard
              ? () => handleCardMint(quantity)
              : () => handleCryptoMint(quantity)
          }
        >
          {payWithCard ? 'MINT WITH CARD' : 'MINT WITH CRYPTO'}
        </St.Button>
      </St.BuyModalContainer>
    </>
  );
};

export default BuyModal;
