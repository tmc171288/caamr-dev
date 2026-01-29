import { useEffect, useState } from "preact/hooks";

interface TypewriterProps {
  strings: string[];
  loop?: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBeforeDelete?: number;
  className?: string;
}

export default function Typewriter({
  strings,
  loop = true,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBeforeDelete = 2000,
  className = "",
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % strings.length;
      const fullText = strings[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );

      setTypingSpeed(isDeleting ? deleteSpeed : typeSpeed);

      if (!isDeleting && text === fullText) {
        if (!loop && loopNum === strings.length - 1) return;
        setTimeout(() => setIsDeleting(true), delayBeforeDelete);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    loopNum,
    strings,
    typeSpeed,
    deleteSpeed,
    delayBeforeDelete,
    loop,
    typingSpeed,
  ]);

  return (
    <span class={className}>
      {text}
      <span class="animate-pulse border-r-2 border-primary-600 dark:border-primary-400 ml-1">
      </span>
    </span>
  );
}
