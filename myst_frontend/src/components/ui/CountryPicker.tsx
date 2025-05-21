import {
  ActionIcon,
  Box,
  Combobox,
  Group,
  useCombobox,
  Text,
} from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import countryCurrencyMap from "../../assets/currency/countryCodeCurrency.json";
import { IconWorld } from "@tabler/icons-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCurrency } from "../../context/CurrencyContext";

export default function CountryPicker() {
  const { country, currency, changeCountryAndCurrency } = useCurrency();

  const parentRef = useRef(null);

  const countryList = useMemo(() => {
    return Object.entries(countryCurrencyMap).map(
      ([countryCode, { Currency }]) => ({
        countryCode: countryCode.toLowerCase(),
        currencyCode: Currency.toUpperCase(),
      }),
    );
  }, []);

  const combobox = useCombobox({
    onDropdownOpen: (eventSource) => {
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(country);
  }, [country]);

  const rowVirtualizer = useVirtualizer({
    count: countryList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // each option row is ~40px
  });

  const cbxOptions = countryList.map(({ countryCode, currencyCode }) => (
    <Combobox.Option
      value={countryCode}
      key={countryCode}
      active={countryCode === value}
    >
      <Group gap="xs">
        <img
          src={`/flags/${countryCode}.svg`}
          alt={currencyCode}
          width={20}
          height={20}
          loading="lazy"
        />
        <span>{countryCode.toLocaleUpperCase()}</span>
      </Group>
    </Combobox.Option>
  ));

  const hasFlag = countryList.some(({ countryCode }) => countryCode === value);

  const leftSection = hasFlag ? (
    <img
      src={`/flags/${value}.svg`}
      alt={value}
      width={20}
      height={20}
      loading="lazy"
    />
  ) : (
    <IconWorld size={20} color="#ccc" />
  );

  return (
    <Combobox
      size="xs"
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        const foundCurrency = countryList.find(
          ({ countryCode }) => countryCode === optionValue,
        )?.currencyCode;

        if (!foundCurrency) return;

        changeCountryAndCurrency(optionValue, foundCurrency);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <ActionIcon
          variant="default"
          size={"md"}
          w={70}
          p={3}
          value={value.toLocaleUpperCase()}
          onClick={() => {
            if (combobox.dropdownOpened) {
              combobox.closeDropdown();
            } else {
              combobox.openDropdown();
            }
          }}
          onBlur={() => combobox.closeDropdown()}
        >
          <>
            {leftSection}
            <Text component="span" size="xs" c={"dimmed"} ml={5}>
              {currency.toLocaleUpperCase()}
            </Text>
          </>
        </ActionIcon>
      </Combobox.Target>

      <Combobox.Dropdown
        hidden={cbxOptions.length === 0}
        style={{ minWidth: 100, width: 105 }}
      >
        <Combobox.Options
          mah={200}
          ref={parentRef}
          style={{ overflowY: "auto" }}
        >
          <Box
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const { countryCode, currencyCode } =
                countryList[virtualRow.index];
              return (
                <div
                  key={countryCode}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${virtualRow.size}px`,
                    width: "100%",
                  }}
                >
                  <Combobox.Option value={countryCode}>
                    <Group gap="xs">
                      <img
                        src={`/flags/${countryCode}.svg`}
                        alt={currencyCode}
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                      <span>{currencyCode.toUpperCase()}</span>
                    </Group>
                  </Combobox.Option>
                </div>
              );
            })}
          </Box>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
