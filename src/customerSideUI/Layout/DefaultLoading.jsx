import { Card } from "antd";

const DefaultLoading = () => {
  return (
    <div className="w-full min-h-screen flex flex-wrap items-start justify-between">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((res, index) => {
        return (
          <Card
            key={index}
            style={{
              width: 300,
              marginTop: 16,
            }}
            loading={true}
          >
            <Card.Meta />
          </Card>
        );
      })}
    </div>
  );
};

export default DefaultLoading;
