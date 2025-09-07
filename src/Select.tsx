import React, {
  useContext,
  createContext,
  useState,
  useId,
  useRef,
  useEffect,
} from "react";
import { useOnClickOutside } from "usehooks-ts";

import "./css/theme.css";

import cls from "./utils/classNames";

type Value = string | number;
interface SelectContextValue {
  value: Value | null;
  onSelectOption: (v: Value) => void;
}
const SelectContext = createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Must be used within a SelectContext");
  }

  return context;
};

interface OptionProps {
  value: Value;
  children: string;
  isDisabled?: boolean;
  label?: string;
}

const Option: React.FC<OptionProps> = ({ value, isDisabled, children }) => {
  const { value: currentValue, onSelectOption } = useSelectContext();
  const isSelected = currentValue === value;

  return (
    <li
      className={cls(
        "option",
        isSelected && "selected",
        isDisabled && "disabled",
      )}
      onClick={() => {
        if (isDisabled) {
          return;
        }
        onSelectOption(value);
      }}
    >
      <span>{children}</span>
      <style jsx>{`
        .option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 44px;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 400;
          color: var(--color-text-primary);
          list-style: none;
          cursor: pointer;
        }
        span {
          text-wrap: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .option.selected::after {
          content: url("/check-line.svg");
          display: block;
          width: 20px;
          height: 20px;
        }
        .option.disabled {
          color: var(--color-disabled);
          cursor: not-allowed;
        }
        .option.disabled:hover {
          background-color: var(--color-white);
        }
        .option:hover {
          background-color: var(--color-option-hover);
        }
        .option.selected {
          background-color: var(--color-secondary);
        }
        .option.selected:hover {
          background-color: var(--color-primary);
        }
        .option:first-child {
          border-radius: var(--border-radius) var(--border-radius) 0px 0px;
        }
        .option:last-child {
          border-radius: 0 0 var(--border-radius) var(--border-radius);
        }
      `}</style>
    </li>
  );
};

interface DropdownProps {
  isHidden: boolean;
  isLoading: boolean;
  children?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  isHidden,
  isLoading,
  children,
}) => {
  const hasChildren = React.Children.count(children);
  return (
    <ul className={cls("dropdown", isHidden && "hidden")}>
      {isLoading ? <p>Loading...</p> : hasChildren ? children : <p>Empty</p>}
      {/* TODO: scrollbar style */}
      <style jsx>{`
        .hidden {
          display: none;
        }
        p {
          padding: 10px;
          text-align: center;
          font-size: 14px;
          color: var(--color-text-secondary);
        }
        .dropdown {
          position: absolute;
          z-index: 10;
          width: var(--select-width);
          max-height: var(--select-dropdown-max-height);
          padding: 0px;
          margin: 4px 0 0 0;
          background-color: var(--color-white);
          border-radius: var(--border-radius);
          border: 1px solid var(--color-border);
          overflow: scroll;
        }
      `}</style>
    </ul>
  );
};

const getLabelFromOptionChildren = (
  value: Value,
  children: React.ReactNode,
): string | null => {
  let label = null;
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement<OptionProps>(child) &&
      child.props.value === value
    ) {
      label = child.props.label || child.props.children;
    }
  });

  return label;
};

interface SelectProps {
  value?: Value;
  defaultValue?: Value;
  isDisabled?: boolean;
  placeholder?: string;
  label?: string;
  helperText?: string;
  onChange?: (v: Value) => void;
  errorMessage?: string;
  children?: React.ReactNode;
  isLoadingOptions?: boolean;
  className?: string;
}

interface SelectComponent extends React.FC<SelectProps> {
  Option: typeof Option;
}

const Select: SelectComponent = ({
  value,
  defaultValue,
  label,
  isDisabled,
  onChange,
  placeholder,
  errorMessage,
  helperText,
  children,
  isLoadingOptions,
  className,
}) => {
  const [currentValue, setCurrentValue] = useState<Value | null>(
    defaultValue || null,
  );
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const finalValue = value || currentValue;
  const currentValueLabel = finalValue
    ? getLabelFromOptionChildren(finalValue, children)
    : null;
  const currentValueLabelDisplay = currentValueLabel ?? placeholder ?? "";
  const isShowingPlaceholder = currentValueLabelDisplay === placeholder;

  // TODO: Consider optimizing with useCallback and Memo if React Compiler is not available
  function handleSelectOption(v: Value) {
    setCurrentValue(v);
    setIsDropdownHidden(true);
    inputRef.current?.focus();
    onChange?.(v);
  }

  const selectContextValue: SelectContextValue = {
    value: finalValue,
    onSelectOption: handleSelectOption,
  };

  const isHelperTextVisible = helperText || errorMessage;

  const inputId = `select-input-${useId()}`;

  useEffect(() => {
    setCurrentValue(defaultValue || null);
  }, [defaultValue]);

  useOnClickOutside(selectRef as React.RefObject<HTMLDivElement>, () => {
    setIsDropdownHidden(true);
  });

  function handleClickInput() {
    if (isDisabled) {
      return;
    }

    setIsDropdownHidden((isHidden) => !isHidden);
  }
  // TODO: Add ARIA attributes
  // TODO: Abstract the Input component
  return (
    <div
      ref={selectRef}
      className={cls(
        "select",
        className,
        isDisabled && "disabled",
        Boolean(errorMessage) && "has-error",
      )}
    >
      {label && (
        <label htmlFor={inputId} className="select-label">
          {label}
        </label>
      )}
      <div className="wrap">
        <div
          className={cls("select-input-wrap", !isDropdownHidden && "is-open")}
          onClick={handleClickInput}
        >
          <input
            ref={inputRef}
            id={inputId}
            disabled={isDisabled}
            className={cls(
              "select-input",
              isShowingPlaceholder && "is-showing-placeholder",
            )}
            name="select-input"
            type="text"
            readOnly
            value={currentValueLabelDisplay}
          />
        </div>
        <SelectContext value={selectContextValue}>
          <Dropdown
            isHidden={isDropdownHidden}
            isLoading={Boolean(isLoadingOptions)}
          >
            {children}
          </Dropdown>
        </SelectContext>
      </div>
      {isHelperTextVisible && (
        <span className="helper-text">{errorMessage || helperText}</span>
      )}
      <style jsx>{`
        .select {
          display: flex;
          flex-direction: column;
          width: var(--select-width);
          font-family: "Inter", sans-serif;
        }
        .select.disabled {
          color: var(--color-disabled);
        }
        .select-label {
          margin-bottom: 8px;
          line-height: 1.25;
          font-weight: 600;
          font-size: 14px;
          color: var(--color-text-primary);
        }
        .select.disabled .select-label,
        .select.disabled .select-input {
          color: var(--color-disabled);
        }
        .select.has-error .helper-text {
          color: var(--color-error);
        }
        .helper-text {
          margin-top: 8px;
          line-height: 1.5;
          font-weight: 400;
          font-size: 12px;
          color: var(--color-text-secondary);
        }
        .wrap {
          position: relative;
        }
        .select.has-error .select-input {
          border-color: var(--color-error);
        }
        .select-input {
          width: var(--select-width);
          height: var(--select-height);
          padding: 12px 16px;
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-primary);
          cursor: pointer;
          outline: none;
          text-overflow: ellipsis;
        }
        .select.disabled .select-input,
        .select.disabled .select-input-wrap {
          cursor: not-allowed;
        }
        .select-input.is-showing-placeholder {
          color: var(--color-text-placeholder);
        }
        .select-input:hover {
          border-color: var(--color-border-hover);
        }
        .select.disabled .select-input:hover {
          border-color: var(--color-disabled);
        }
        .select-input:focus {
          border-color: var(--color-border-focus);
        }
        .select-input-wrap {
          display: inline-block;
          position: relative;
          cursor: pointer;
        }
        .select-input-wrap::after {
          content: url("/arrow-down-s-line.svg");
          display: block;
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          height: 24px;
          width: 24px;
        }
        .select.disabled .select-input-wrap::after {
          content: url("/arrow-down-s-line-grey.svg");
        }
        .select-input-wrap.is-open::after {
          content: url("/arrow-up-s-line.svg");
        }
      `}</style>
    </div>
  );
};

Select.Option = Option;

export default Select;
