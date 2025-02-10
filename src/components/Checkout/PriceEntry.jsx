import { Typography } from "neetoui";
import { Trans } from "react-i18next";

const PriceEntry = ({ totalPrice, i18nKey, className = "" }) => (
  <Typography className="flex justify-between" style="h5">
    <Trans
      {...{ i18nKey }}
      values={{ totalPrice }}
      components={{
        span: <span {...{ className }} />,
      }}
    />
  </Typography>
);

export default PriceEntry;
