import { toast } from "react-toastify";

import IconDropdown from "@/components/common/Dropdown/IconDropdown";
import Question from "@/components/Edit/Body/QuestionEdit";
import ToggleButton from "@/components/common/ToggleButton";
import QuestionRead from "@/components/Edit/Body/QuestionRead";
import IconButton from "@/components/common/IconButton";
import { QUESTION_TYPE_LIST } from "@/store/form";
import { useEditStore } from "@/store/edit";

import DragIndicator from "@public/icons/dragIndicator.svg";
import Add from "@public/icons/add.svg";
import Copy from "@public/icons/copy.svg";
import Trashcan from "@public/icons/trashcan.svg";
import { QuestionType } from "@/types/form";
import { useContext, useEffect, useRef, useState } from "react";
import { IconType } from "@/types/icons";
import { FormEditContext } from "@/contexts/formEditStoreProvider";
import { useStore } from "zustand";

function Body() {
  const formEditStore = useContext(FormEditContext);
  if (!formEditStore) throw new Error("Missing FormEditContext.Provider in the tree");

  const { question, actions: formActions } = useStore(formEditStore);

  const { focus, drag, hover, actions: editStateActions } = useEditStore();

  const onClickQuestion = (index: number) => {
    editStateActions.setFocus(`q${index}`);
  };

  const onMouseOverQuestion = (index: number) => {
    editStateActions.setHover(`q${index}`);
  };
  const onMouseOutQuestion = () => {
    editStateActions.setHover("");
  };

  const onInputQuestionTitle = (value: string, questionIndex: number) => {
    formActions.changeQuestionTitle(value, questionIndex);
  };

  const onClickSetQuestionType = (value: QuestionType, questionIndex: number) => {
    formActions.changeQuestionType(value, questionIndex);
  };

  const onClickCopyQuestion = (questionIndex: number) => {
    formActions.copyQuestion(questionIndex);
  };

  const onClickAddQuestion = (questionIndex: number) => {
    formActions.addQuestion(questionIndex);
  };

  const onClickDeleteQuestion = (questionIndex: number) => {
    if (question.length === 1) {
      toast.error("삭제가 불가능합니다!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    formActions.deleteQuestion(questionIndex);
  };

  const onClickChangeQuestionEssential = (questionIndex: number) => {
    formActions.changeQuestionEssential(questionIndex);
  };

  const showDragIndicator = (index: number) => {
    if (focus === `q${index}`) return true;
    if (drag === `q${index}`) return true;
    if (drag && drag !== hover) return false;
    if (hover === `q${index}`) return true;
    return false;
  };

  // drag
  const droppableRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement[]>([]);
  const snapshotRef = useRef<
    {
      width: number;
      height: number;
      top: number;
      bottom: number;
      left: number;
      right: number;
      marginTop: number;
      marginBottom: number;
      marginLeft: number;
      marginRight: number;
    }[]
  >([]);

  const placeholder = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [originalMouseY, setOriginalMouseY] = useState(0);
  const [destinationMouseY, setDestinationMouseY] = useState(0);
  const [scrollMovingY, setScrollMovingY] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [destination, setDestination] = useState<number | null>(null);

  useEffect(() => {
    placeholder.current = document.createElement("div");
  }, []);

  // mouse down logic
  useEffect(() => {
    if (!isMouseDown) return;
    if (!droppableRef.current) return;
    if (selectedIndex === null) return;
    if (!placeholder.current) return;

    // capture
    draggableRef.current = Array.from(droppableRef.current.children) as HTMLDivElement[];
    snapshotRef.current = draggableRef.current.map((node) => ({
      width: node.offsetWidth,
      height: node.offsetHeight,
      top: Number(node.getBoundingClientRect().top),
      bottom: Number(node.getBoundingClientRect().bottom),
      left: node.getBoundingClientRect().left,
      right: node.getBoundingClientRect().right,
      marginTop: Number(window.getComputedStyle(node).marginTop.slice(0, -2)),
      marginBottom: Number(window.getComputedStyle(node).marginBottom.slice(0, -2)),
      marginLeft: Number(window.getComputedStyle(node).marginLeft.slice(0, -2)),
      marginRight: Number(window.getComputedStyle(node).marginRight.slice(0, -2)),
    }));

    // document style
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    // animation init
    const selectedItem = draggableRef.current[selectedIndex];

    const selectedItemBottom = selectedItem.getBoundingClientRect().bottom;
    const transformY =
      snapshotRef.current[selectedIndex].height +
      snapshotRef.current[selectedIndex].marginTop +
      snapshotRef.current[selectedIndex].marginBottom;

    draggableRef.current.forEach((node, index) => {
      if (index === selectedIndex) return;

      if (selectedItemBottom < node.getBoundingClientRect().top) {
        node.style.transform = `translate(0px, ${transformY}px)`;
      }
    });

    // target style
    selectedItem.style.position = "fixed";
    selectedItem.style.width = snapshotRef.current[selectedIndex].width + "px";
    selectedItem.style.height = snapshotRef.current[selectedIndex].height + "px";

    selectedItem.style.top =
      snapshotRef.current[selectedIndex].top - snapshotRef.current[selectedIndex].marginTop + "px";
    selectedItem.style.left =
      snapshotRef.current[selectedIndex].left - snapshotRef.current[selectedIndex].marginLeft + "px";
    selectedItem.style.boxSizing = "border-box";
    selectedItem.style.zIndex = "5000";
    selectedItem.style.pointerEvents = "none";

    // create placeholder
    placeholder.current.style.height = snapshotRef.current[selectedIndex].height + "px";
    placeholder.current.style.width = snapshotRef.current[selectedIndex].width + "px";
    placeholder.current.style.marginTop = snapshotRef.current[selectedIndex].marginTop + "px";
    placeholder.current.style.marginBottom = snapshotRef.current[selectedIndex].marginBottom + "px";
    placeholder.current.style.marginLeft = snapshotRef.current[selectedIndex].marginLeft + "px";
    placeholder.current.style.marginRight = snapshotRef.current[selectedIndex].marginRight + "px";

    droppableRef.current.appendChild(placeholder.current);
  }, [isMouseDown, selectedIndex]);

  // mouse move logic
  useEffect(() => {
    if (!droppableRef.current) return;
    if (selectedIndex === null) return;
    if (!placeholder.current) return;

    // handleMouseDown
    if (isMouseDown) {
      const selectedItem = draggableRef.current[selectedIndex];

      // target transform
      selectedItem.style.transform = `translate(0px, ${destinationMouseY - originalMouseY}px)`;

      // collision detection
      const selectedItemTop = selectedItem.getBoundingClientRect().top;
      const selectedItemBottom = selectedItem.getBoundingClientRect().bottom;
      const transformY =
        snapshotRef.current[selectedIndex].height +
        snapshotRef.current[selectedIndex].marginTop +
        snapshotRef.current[selectedIndex].marginBottom;

      // animation
      draggableRef.current.forEach((node, index) => {
        if (index === selectedIndex) return;

        if (direction === "down") {
          if (selectedItemBottom < node.getBoundingClientRect().top + node.clientHeight / 2) {
            node.classList.add("transition-drag");
            node.style.transform = `translate(0px, ${transformY}px)`;
          } else {
            node.removeAttribute("style");
          }
        }

        if (direction === "up") {
          if (selectedItemTop > node.getBoundingClientRect().top + node.clientHeight / 2) {
            node.removeAttribute("style");
          } else {
            node.classList.add("transition-drag");
            node.style.transform = `translate(0px, ${transformY}px)`;
          }
        }
      });

      // detection
      const slice = draggableRef.current.slice();
      slice.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
      const destination = slice.findIndex(
        (node) => node.getAttribute("data-id") == selectedItem.getAttribute("data-id")
      );
      setDestination(destination);
    }
  }, [destinationMouseY, direction, scrollMovingY]);

  // mouse up logic
  useEffect(() => {
    if (isMouseDown) return;
    if (selectedIndex === null) return;
    if (!droppableRef.current) return;
    if (!placeholder.current) return;

    if (destination === null) {
      // delete placeholder
      if (Array.from(droppableRef.current.children).includes(placeholder.current)) {
        droppableRef.current.removeChild(placeholder.current);
      }

      setDestination(null);

      // clean up
      draggableRef.current.forEach((node) => {
        node.removeAttribute("style");
        node.classList.remove("transition-drag");
        node.classList.remove("transition-drop");
      });

      // document style
      document.body.removeAttribute("style");

      return;
    }

    // destination으로 이동
    const currentSelectedItem = draggableRef.current[selectedIndex];
    const snapshotSelectedItem = snapshotRef.current[selectedIndex];

    currentSelectedItem.classList.add("transition-drop");

    const currentSelectedItemBoundingClientTop = currentSelectedItem.getBoundingClientRect().top;
    const snapshotSelectedItemBoundingClientTop = snapshotSelectedItem.top;

    const candidates = draggableRef.current.filter(
      (node) => node.getBoundingClientRect().top < currentSelectedItemBoundingClientTop
    );

    if (candidates.length === 0) {
      const parentBoundingClientRectTop = droppableRef.current.getBoundingClientRect().top;
      const distance = parentBoundingClientRectTop - snapshotSelectedItemBoundingClientTop;

      currentSelectedItem.style.transform = `translate(0px, ${distance}px)`;
    } else {
      const closest = candidates[candidates.length - 1];
      const target = closest.getBoundingClientRect().top + closest.offsetHeight + snapshotSelectedItem.marginTop;
      const distance = target - snapshotSelectedItemBoundingClientTop;

      currentSelectedItem.style.transform = `translate(0px, ${distance}px)`;
    }

    const timerId = setTimeout(() => {
      if (!droppableRef.current) return;
      if (!placeholder.current) return;

      // delete placeholder
      if (Array.from(droppableRef.current.children).includes(placeholder.current)) {
        droppableRef.current.removeChild(placeholder.current);
      }

      // form change
      formActions.changeQuestionOrder(selectedIndex, destination);
      editStateActions.setFocus(`q${destination}`);

      setDestination(null);

      // clean up
      draggableRef.current.forEach((node) => {
        node.removeAttribute("style");
        node.classList.remove("transition-drag");
        node.classList.remove("transition-drop");
      });

      // document style
      document.body.removeAttribute("style");
    }, 300);

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [isMouseDown]);

  const handleMouseMove = (e: MouseEvent) => {
    setDestinationMouseY(e.clientY);
    if (e.movementY < 0) {
      setDirection("up");
    } else if (e.movementY > 0) {
      setDirection("down");
    }
  };

  const handleScroll = () => {
    setScrollMovingY((prev) => {
      if (prev < window.scrollY) setDirection("down");
      else if (prev > window.scrollY) setDirection("up");

      return window.scrollY;
    });
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);

    editStateActions.setDrag("");

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("scroll", handleScroll);
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    setSelectedIndex(index);
    setIsMouseDown(true);
    setOriginalMouseY(e.clientY);
    setDestinationMouseY(e.clientY);

    editStateActions.setDrag(`q${index}`);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("scroll", handleScroll);
  };

  return (
    <div ref={droppableRef} className="relative">
      {question.map(({ questionId, title, type, essential }, questionIndex) => (
        <div
          className="mt-4 bg-white rounded pt-0 pb-5 px-5 border border-grey3 relative overflow-hidden"
          onClick={() => onClickQuestion(questionIndex)}
          onMouseOver={() => onMouseOverQuestion(questionIndex)}
          onMouseOut={() => onMouseOutQuestion()}
          key={questionId}
          data-id={questionId}
        >
          <div
            className="h-[30px] flex justify-center py-1 px-0 cursor-grab"
            onMouseDown={(e) => handleMouseDown(e, questionIndex)}
          >
            {showDragIndicator(questionIndex) ? (
              <DragIndicator height="16" width="16" className="pointer-events-none" />
            ) : null}
          </div>
          {focus === `q${questionIndex}` && (
            <>
              <div className="flex justify-between">
                <input
                  className="block w-3/5 text-base py-2 px-3 border-b border-b-grey3 bg-grey1 rounded focus:outline-none focus:border-b focus:border-b-black leading-7"
                  onInput={(e: React.FormEvent<HTMLInputElement>) =>
                    onInputQuestionTitle(e.currentTarget.value, questionIndex)
                  }
                  value={question[questionIndex].title}
                  placeholder="질문"
                />
                <IconDropdown
                  state={type}
                  setState={(questionType: IconType) => {
                    onClickSetQuestionType(questionType, questionIndex);
                  }}
                  items={QUESTION_TYPE_LIST}
                  defaultValue="선택해주세요"
                />
              </div>
              <div className="py-2 px-0">
                <Question index={questionIndex} />
              </div>
              <hr className="h-[1px] border-0 bg-grey2" />
              <div className="flex items-center justify-end mt-4">
                <IconButton type="button" onClick={() => onClickAddQuestion(questionIndex)} className="mr-3">
                  <Add height="21" width="21" viewBox="0 0 24 24" />
                </IconButton>
                <IconButton type="button" onClick={() => onClickCopyQuestion(questionIndex)} className="mr-3">
                  <Copy height="18" width="18" viewBox="0 0 24 24" />
                </IconButton>
                <IconButton type="button" onClick={() => onClickDeleteQuestion(questionIndex)} className="mr-3">
                  <Trashcan width="18" height="18" viewBox="0 0 24 24" />
                </IconButton>
                <div className="flex items-center border-l border-l-grey3 py-2 px-3">
                  <span className="text-base mr-2">필수</span>
                  <ToggleButton state={essential} onClick={() => onClickChangeQuestionEssential(questionIndex)} />
                </div>
              </div>
            </>
          )}
          {focus !== `q${questionIndex}` && (
            <>
              <div>{title}</div>
              <QuestionRead index={questionIndex} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Body;
