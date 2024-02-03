import { Spin } from 'antd'

const GlobalLoading = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
            <Spin spinning />
        </div>
    )
}

export default GlobalLoading
