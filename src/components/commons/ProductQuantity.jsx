import { useRef } from "react";

import { VALID_COUNT_REGEX } from "components/constants";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Button, Input, Toastr } from "neetoui";

import TooltipWrapper from "./TooltipWrapper";

const ProductQuantity = ({ slug }) => {
  const countInputFocus = useRef(null);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;

  const { data: product = {} } = useShowProduct(slug);
  const { availableQuantity } = product;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity;

  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSetCount = event => {
    const { value } = event.target;
    const parsedValue = parseInt(value) || 0;
    const isNotValidQuantity = parsedValue > availableQuantity;
    if (isNotValidQuantity) {
      Toastr.error(`Only ${availableQuantity} units are available`, {
        autoClose: 2000,
      });
      setSelectedQuantity(availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };

  return (
    <div>
      <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
        <Button
          className="focus-within:ring-0"
          label="-"
          style="text"
          onClick={e => {
            preventNavigation(e);
            setSelectedQuantity(parsedSelectedQuantity - 1);
          }}
        />
        <Input
          nakedInput
          className="ml-2"
          contentSize="2"
          ref={countInputFocus}
          value={selectedQuantity}
          onChange={handleSetCount}
          onClick={preventNavigation}
        />
        <TooltipWrapper
          content="Reached maximum units"
          position="top"
          showTooltip={isNotValidQuantity}
        >
          <Button
            className="focus-within:ring-0"
            disabled={isNotValidQuantity}
            label="+"
            style="text"
            onClick={e => {
              preventNavigation(e);
              setSelectedQuantity(parsedSelectedQuantity + 1);
            }}
          />
        </TooltipWrapper>
      </div>
    </div>
  );
};
export default ProductQuantity;
