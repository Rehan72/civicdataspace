import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 5;
const DEFAULT_SORT = 'recent';
const DEFAULT_ORDER = 'desc';

export const useDatasetStore = create(
  persist(
    (set, get) => ({
      // State
      query: '',
      page: DEFAULT_PAGE,
      size: DEFAULT_SIZE,
      sort: DEFAULT_SORT,
      order: DEFAULT_ORDER,
      filters: {
        sectors: [],
        formats: [],
        tags: [],
        geographies: []
      },

      // Actions
      setQuery: (query) => set({ query, page: DEFAULT_PAGE }),
      setPage: (page) => set({ page }),
      setSize: (size) => set({ size, page: DEFAULT_PAGE }),
      setSort: (sort, order) => set({ sort, order, page: DEFAULT_PAGE }),
      
      toggleFilter: (group, value) => set((state) => {
        const currentValues = state.filters[group] || [];
        const isSelected = currentValues.includes(value);
        const updatedValues = isSelected
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];
        
        return {
          page: DEFAULT_PAGE,
          filters: { ...state.filters, [group]: updatedValues }
        };
      }),

      resetFilters: () => set({
        page: DEFAULT_PAGE,
        filters: {
          sectors: [],
          formats: [],
          tags: [],
          geographies: []
        }
      }),

      // Helper to hydrate from URL (for sharing)
      hydrateFromParams: (params) => {
        const filters = {
          sectors: params.get('sectors')?.split(',').filter(Boolean) || [],
          formats: params.get('formats')?.split(',').filter(Boolean) || [],
          tags: params.get('tags')?.split(',').filter(Boolean) || [],
          geographies: params.get('geographies')?.split(',').filter(Boolean) || []
        };

        set({
          query: params.get('query') || '',
          page: Number(params.get('page')) || DEFAULT_PAGE,
          size: Number(params.get('size')) || DEFAULT_SIZE,
          sort: params.get('sort') || DEFAULT_SORT,
          order: params.get('order') || DEFAULT_ORDER,
          filters
        });
      }
    }),
    {
      name: 'dataset-search-storage',
      storage: createJSONStorage(() => sessionStorage), // Persistence in sessionStorage
    }
  )
);
