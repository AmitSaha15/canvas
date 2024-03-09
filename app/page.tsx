'use client';

import { fabric } from "fabric";
import LeftSideBar from "@/components/LeftSideBar";
import Live from "@/components/Live";
import NavBar from "@/components/NavBar";
import RightSideBar from "@/components/RightSideBar";
import { useEffect, useRef } from "react";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";

export default function Page() {

  /**
   * canvasRef is a reference to the canvas element that we'll use to initialize
   * the fabric canvas.
   *
   * fabricRef is a reference to the fabric canvas that we use to perform
   * operations on the canvas. It's a copy of the created canvas so we can use
   * it outside the canvas event listeners.
   */

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  /**
   * isDrawing is a boolean that tells us if the user is drawing on the canvas.
   * We use this to determine if the user is drawing or not
   * i.e., if the freeform drawing mode is on or not.
   */
  const isDrawing = useRef(false);
  /**
   * shapeRef is a reference to the shape that the user is currently drawing.
   * We use this to update the shape's properties when the user is
   * drawing/creating shape
   */
  const shapeRef = useRef<fabric.Object | null>(null);
  /**
   * selectedShapeRef is a reference to the shape that the user has selected.
   * For example, if the user has selected the rectangle shape, then this will
   * be set to "rectangle".
   *
   * We're using refs here because we want to access these variables inside the
   * event listeners. We don't want to lose the values of these variables when
   * the component re-renders. Refs help us with that.
   */
  const selectedShapeRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = initializeFabric({canvasRef, fabricRef});

    /**
     * listen to the mouse down event on the canvas which is fired when the
     * user clicks on the canvas
     */

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      });
    });

    /**
     * listen to the resize event on the window which is fired when the
     * user resizes the window.
     *
     * We're using this to resize the canvas when the user resizes the
     * window.
     */
    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });
  }, [])

  return (
      <main className="h-screen overflow-hidden">
        <NavBar/>

        <section className="flex h-full flex-row">
          <LeftSideBar/>
          <Live canvasRef={canvasRef} />
          <RightSideBar/>
        </section>
        
      </main>
  );
}