import { Button } from 'react-bootstrap';

interface MsgAlertBoxProps {
  msg: string;
  validateIntent: boolean;
  closeMsgBox: Function;
}

export default function MsgAlertBox(props: MsgAlertBoxProps) {
  return (
    <>
      {props.validateIntent && (
        <div id='alertMsgBox'>
          <p className='text-black'>{props.msg}</p>
          <Button variant='danger' onClick={() => props.closeMsgBox()}>
            Close
          </Button>
        </div>
      )}
    </>
  );
}
