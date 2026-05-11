function CategoryFilter({ category, onChangeCategory }) {
  const categories = ['신규', '헬스케어', '물류', '농업'];
  return (
    <select
      className="border p-2 rounded-lg w-full sm:w-32"
      value={category}
      onChange={e => {
        const value = e.target.value;
        onChangeCategory(value === 'all' ? undefined : value); // category가 undefined면 Axios가 알아서 URL에서 빼줍니다. 의도한 대로 동작하는 것입니다. "전체"를 선택하면 category 필터 없이 전체 조회, 특정 카테고리를 선택하면 해당 카테고리만 조회됩니다
      }}
    >
      <option value="all">전체</option>
      {categories.map(cate => (
        <option key={cate} value={cate}>
          {cate}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
