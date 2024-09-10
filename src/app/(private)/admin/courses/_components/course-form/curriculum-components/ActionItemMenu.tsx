function ActionItemMenu({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: any;
  onClick: () => void;
}) {
  return (
    <div className="flex gap-2 cursor-pointer items-center" onClick={onClick}>
      <span>{icon}</span>
      <span className="text-sm">{title}</span>
    </div>
  );
}
export default ActionItemMenu;
