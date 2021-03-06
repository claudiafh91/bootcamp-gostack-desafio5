import styled  from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius:50%;
    margin-top: 10px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 20px;
  margin-top:10px;
  border-top: 2px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 2px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
 }
`;

export const FilterIssue = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin:10px 10px;
`;

export const Select = styled.select`
  border: 2px solid #eee;
  padding: 10px, 10px;
  margin-left: 5px;
`;

export const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`;

export const ButtonPage = styled.button.attrs(props => ({
  disabled: props.available,
}))`
  background: #7159c1;
  border: 0;
  padding: 3px 5px;
  margin: 10px 10px;
  border-radius: 4px;


  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Page = styled.label``;
