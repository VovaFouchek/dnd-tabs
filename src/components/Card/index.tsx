import type { CSSProperties } from 'react';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface TabCardProps {
  id: string;
  label: string;
  moveTab: (id: string, to: number) => void;
  findTab: (id: string) => { index: number };
}

interface DragItem {
  id: string;
  originalIndex: number;
}

const tabCardStyle: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const TabCard = ({ id, label, moveTab, findTab }: TabCardProps) => {
  const originalIndex = findTab(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'TAB',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();

        if (!didDrop) {
          moveTab(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveTab],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'TAB',
      hover({ id: draggedId }: DragItem) {
        if (draggedId !== id) {
          const { index: overIndex } = findTab(id);
          moveTab(draggedId, overIndex);
        }
      },
    }),
    [findTab, moveTab],
  );

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ ...tabCardStyle, opacity }}>
      {label}
    </div>
  );
};

export default memo(TabCard);
