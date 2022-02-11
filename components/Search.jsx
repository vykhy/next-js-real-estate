import { useState, useEffect } from "react";
import {
  Flex,
  Select,
  Text,
  Box,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/router";
import { filterData, getFilterValues } from "../utils/filterData";

export default function SearchFilter() {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      query[item.name] = item.value;
    });
    router.push({ pathname: path, query });
  };
  return (
    <Flex bg={"gray.100"} justifyContent={"center"} flexWrap={"wrap"}>
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            placeholder={filter.placeholder}
            w={"fit-content"}
            p={2}
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
}
