# Whatsapp Web Clone

- This is a clone of the Whatsapp Web to practice my web development skills.
- Frontend focused full-stack project by using React, Firebase, and nested-css.

## Project Goal

- The main goal is to develop a large-scale application structure and to practice zustand for state management.

## My Notes

### useImperativeHandle(ref, () => inputRef.current!);

- useImperativeHandle is a React hook that allows you to customize the instance value that is exposed to parent components when using ref. It is useful when you want to expose a certain method or property to the parent component.

- The first argument is the ref object that is passed to the component. The second argument is a function that returns the value that will be exposed to the parent component.

### useCamera

- useCamera is a custom hook that uses the `navigator.mediaDevices.getUserMedia` API to access the user's camera and microphone. It returns a video stream object that can be used to display the camera feed in a video element.

### useLineCount

- useLineCount is a custom hook that calculates the number of lines in a text area. It uses the `scrollHeight` and `lineHeight` properties of the text area to determine the number of lines.
