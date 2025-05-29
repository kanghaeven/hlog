export type CategoryMenuButtonProps = {
  category: string;
  selected: boolean;
  isLoading: boolean;
  onClick: (category: string) => void;
};
