import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DragItem {
  id: string;
  originalIndex: number;
}

interface useTabDragAndDropProps {
  id: string;
  isPinned?: boolean;
  moveTab: (id: string, to: number) => void;
  findTab: (id: string) => { index: number };
}

const DELAY_FOR_LONG_PRESS = 2000;

const useTabDragAndDrop = ({ id, isPinned, moveTab, findTab }: useTabDragAndDropProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const touchTimeoutRef = useRef<number | undefined>();

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
      canDrag: !isPinned,
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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleTouchStart = () => {
      touchTimeoutRef.current = window.setTimeout(() => {
        const dragEvent = new DragEvent('dragstart', {
          bubbles: true,
          cancelable: true,
        });

        node.dispatchEvent(dragEvent);
      }, DELAY_FOR_LONG_PRESS);
    };

    const handleTouchEnd = () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };

    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchend', handleTouchEnd, { passive: true });
    node.addEventListener('touchmove', handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleTouchEnd);
      node.removeEventListener('touchmove', handleTouchEnd);
    };
  }, []);

  drag(drop(ref));

  return { ref, isDragging };
};

export default useTabDragAndDrop;
