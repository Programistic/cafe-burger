import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from "react";
import { decCounter } from "../../services/actions/all-ingredients";
import { deleteIngredient } from "../../services/actions/constructor-ingredients";
import { FC } from "react";
import { TIngredient } from "../../types/ingredient";
import { useAppDispatch } from "../../hooks/hooks";
import styles from './burger-component.module.css';

interface IBurgerComponentProps {
  isLocked: boolean;
  text: string;
  price: number;
  image: string;
  thumbnail: string;
  uniqueId: string;
  id: string;
  index: number;
  ingredients: TIngredient[];
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

type TDropItem = {
  id: string;
  index: number;
};

const BurgerComponent: FC<IBurgerComponentProps> = ({ isLocked, text, price, thumbnail, uniqueId, id, index, ingredients, onMove }) => {

  const componentRef = useRef<HTMLLIElement>(null);

  const [, dropRef] = useDrop({
    accept: 'component',
    hover: (item: TDropItem, monitor) => {
      if (!componentRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = componentRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{isDragging}, dragRef] = useDrag({
    type: 'component',
    item: () => {
      return {id, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;

  dragRef(dropRef(componentRef));

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const ingredient = ingredients.find(item => item._id === id) as unknown as TIngredient;
    dispatch(decCounter(ingredient));
    dispatch(deleteIngredient(uniqueId));
  };

  return (
    <li className={styles.componentsListItem} style={{opacity}} ref={componentRef}>
      <button className={styles.buttonDragIcon} type='button'>
        <DragIcon type="primary" />
      </button>
      <ConstructorElement
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={() => handleDelete()}
      />
    </li>
  );
}

export default BurgerComponent;
