import BurgerComponent from "../burger-component/burger-component";
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { shallowEqual } from 'react-redux';
import { addBun, addIngredient, updateConstructor } from "../../services/actions/constructor-ingredients";
import { incCounter } from "../../services/actions/all-ingredients";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { TIngredient } from "../../types/ingredient";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import { setOrder } from "../../services/actions/actions";
import styles from './burger-constructor.module.css';

interface IBurgerConstructorProps {
  onButtonMakeOrderClick: () => void;
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ onButtonMakeOrderClick }) => {

  const { bun, ingredients } = useAppSelector((store)=> ({bun: store.ingredients.bun, ingredients: store.ingredients.ingredients}), shallowEqual);
  const { ingredientsArr } = useAppSelector((store) => ({ingredientsArr: store.data.data}), shallowEqual);
  const { loggedIn } = useAppSelector((store) => ({ loggedIn: store.flag.loggedIn }), shallowEqual);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [{isHover}, dropTarget] = useDrop({
    accept: 'card',
    drop(item: TIngredient) {
      dropHandler(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const borderColor = isHover ? '#4c4cff' : 'transparent';
  
  const dropHandler = (dropItem: TIngredient): void => {
    const ingredient = ingredientsArr.find((item: TIngredient) => item._id === dropItem._id);
    ingredient.type === 'bun' ? dispatch(addBun(ingredient)) : dispatch(addIngredient(ingredient));
    dispatch(incCounter(ingredient));
  };

  const moveComponent = (dragIndex: number, hoverIndex: number): void => {
    const dragComponent = ingredients[dragIndex];
    const newIngredients = [...ingredients];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragComponent);
    dispatch(updateConstructor(newIngredients));
  };

  const isBun = bun !== null;

  let totalCost = isBun ? (bun.price * 2) : 0;

  const componentList = ingredients.map((ingredient: TIngredient, index: number) => {
    totalCost += ingredient.price;
    
    return (
      <BurgerComponent
        key={ingredient.uniqueId}
        id={ingredient._id}
        uniqueId={ingredient.uniqueId}
        index={index}
        text={ingredient.name}
        image={ingredient.image}
        price={ingredient.price}
        thumbnail={ingredient.image}
        isLocked={false}
        onMove={moveComponent}
        ingredients={ingredients}
      />
    );
  });

  const handleClick = () => {
    const orderIdArray = ingredients.map((item: TIngredient) => item._id);
    if (bun !== null) {
      orderIdArray.unshift(bun._id);
      orderIdArray.push(bun._id);
    }
    if (loggedIn) {
      //dispatch(saveOrder(orderIdArray));
      dispatch(setOrder(orderIdArray) as any);
      onButtonMakeOrderClick();
    } else {
      navigate('/login');
    };
  };

  return (
    <section className={styles.outerContainer}>
      <div className={styles.container} style={{borderColor}} ref={dropTarget}>
        <div>
          { isBun && <ConstructorElement type={'top'} thumbnail={bun.image} text={bun.name + ' (верх)'} price={bun.price} isLocked={true} /> }
        </div>
        <ul className={styles.componentsList} >
          {componentList}
        </ul>
        <div>
          { isBun && <ConstructorElement type={'bottom'} thumbnail={bun.image} text={bun.name + ' (низ)'} price={bun.price} isLocked={true} /> }
        </div>
      </div>
      <div className={styles.innerContainer}>
        <span className={styles.productPrice}>{totalCost}</span>
        <div className={styles.currencyIconLarge}></div>
        <Button htmlType={'button'} type={'primary'} size={'large'} disabled={!isBun} aria-label='Оформить заказ' onClick={handleClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
