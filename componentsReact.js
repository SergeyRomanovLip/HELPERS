//semantic-ui
export const Search = ({ filler }) => {
  function exampleReducer(state, action) {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState
      case 'START_SEARCH':
        return { ...state, loading: true, value: action.query }
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results }
      case 'UPDATE_SELECTION':
        return { ...state, value: action.selection }

      default:
        throw new Error()
    }
  }
  const initialState = {
    loading: false,
    results: [],
    value: '',
  }

  const [state, dispatch] = useReducer(exampleReducer, initialState)
  const { results, value } = state
  const timeoutRef = useRef()
  const { loading, error, request } = useHttp()
  const [requestedData, setRequestedData] = useState()
  const [drivers, setDrivers] = useState([])
  const { jwtToken, id } = useSelector((state) => state.user)
  const handleSearchChange = useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current)
      dispatch({ type: 'START_SEARCH', query: data.value })
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' })
          return
        }
        const re = new RegExp(_.escapeRegExp(data.value), 'i')
        const isMatch = (result) => re.test(result.title + result.phone)
        dispatch({
          type: 'FINISH_SEARCH',
          results: _.filter(drivers, isMatch),
        })
      }, 300)
    },
    [drivers]
  )

  const resRender = ({ title, phone }) => {
    return (
      <div>
        <span>{title}</span>
        <br />
        <span>{phone}</span>
      </div>
    )
  }

  const dataRequest = async (what, options) => {
    const res = await request(
      `/api/data/${what}`,
      'POST',
      { id },
      {
        Authorization: `Bearer ${jwtToken}`,
      }
    )
    setRequestedData((prev) => {
      return { ...prev, [what]: res }
    })
    return res
  }

  useEffect(() => {
    dataRequest('drivers').then((drvrs) => {
      const sortedDrivers = drvrs.map((drvr) => {
        return {
          _id: drvr._id,
          title: drvr.fio,
          phone: drvr.phone,
        }
      })
      setDrivers(sortedDrivers)
    })
  }, [])

  return (
    <Popup
      flowing
      content='?????????????? ?????????????? ?????????????? ?????? ?????????? ???????????????? ?????? 8'
      trigger={
        <Search
          fluid
          loading={loading}
          onResultSelect={(e, data) => {
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            filler(data.result.title, 'fio')
            filler(data.result.phone, 'phone')
          }}
          onSearchChange={(e, data) => {
            handleSearchChange(e, data)
            filler(e.target.value, 'fio')
          }}
          results={results}
          value={value}
          resultRenderer={resRender}
          placeholder={'?????? ????????????????'}
        />
      }
    />
  )
}
