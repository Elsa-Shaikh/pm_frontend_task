import FilterSelect from "../common/FilterSelect";

interface Props {
  sort: string;
  setSort: (value: string) => void;
}

const ProjectFilters = ({ sort, setSort }: Props) => {
  return (
    <>
      <FilterSelect sort={sort} setSort={setSort} />
    </>
  );
};

export default ProjectFilters;
