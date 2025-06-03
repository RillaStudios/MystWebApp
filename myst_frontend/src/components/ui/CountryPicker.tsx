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

/* 
A React component that provides a country picker with a dropdown menu.
This component allows users to select a country, which updates the associated currency.
It uses a virtualized list for performance with many options and displays flags for each country.

@author IFD
*/
export default function CountryPicker() {
  // Import the currency context to get country and currency information
  const { country, currency, changeCountryAndCurrency } = useCurrency();

  // Create a ref to the parent element for virtualized scrolling
  const parentRef = useRef(null);

  // Create a memoized list of countries and their associated currencies
  // This list is derived from the countryCurrencyMap JSON file
  const countryList = useMemo(() => {
    return Object.entries(countryCurrencyMap).map(
      ([countryCode, { Currency }]) => ({
        countryCode: countryCode.toLowerCase(),
        currencyCode: Currency.toUpperCase(),
      }),
    );
  }, []);

  // Initialize the combobox with a custom onDropdownOpen handler
  // This handler selects the active option when the dropdown is opened via keyboard
  const combobox = useCombobox({
    onDropdownOpen: (eventSource) => {
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });

  // State to manage the selected value in the combobox
  const [value, setValue] = useState("");

  // Effect to set the initial value of the combobox based on the current country
  useEffect(() => {
    setValue(country);
  }, [country]);

  // Create a virtualizer to efficiently render the list of countries
  const rowVirtualizer = useVirtualizer({
    count: countryList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // each option row is ~40px
  });

  // Generate the options for the combobox dropdown
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

  // Check if the selected value has a corresponding flag in the country list
  const hasFlag = countryList.some(({ countryCode }) => countryCode === value);

  // Determine the left section of the combobox target based on whether a flag exists
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
      zIndex={1000001}
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
