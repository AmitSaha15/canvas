import { useMyPresence, useOthers } from "@/liveblocks.config"
import LiveCursors from "./cursors/LiveCursors"
import { useCallback } from "react";

const Live = () => {
  const others = useOthers();
  const [{cursor}, updateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((event:React.PointerEvent) => {
    event.preventDefault();

    // note: subtracting position of the cursor relative to the window. Not subtracting from cursor width
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: {x,y} });
  }, [])

  const handlePointerLeave = useCallback((event:React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({ cursor: null, message: null });
  }, [])

  const handlePointerDown = useCallback((event:React.PointerEvent) => {
    
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: {x,y} });
  }, [])

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="w-full h-[100vh] flex justify-center items-center text-center"
    >
      <h1 className="text-3xl text-white">Canvas - A Figma Clone</h1>
      <LiveCursors others={others} />
    </div>
  )
}

export default Live