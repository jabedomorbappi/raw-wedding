interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

// A plain <img> on purpose: admin-provided images can come from any URL.
export default function SmartImage({
  src,
  alt,
  className = "",
  priority = false,
}: SmartImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={className}
    />
  );
}
