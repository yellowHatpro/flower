// @flow
import * as React from 'react';

type Props = {
    denyFn : () => void,
    acceptFn : () => void,
};

export function CompleteYourProfileBanner(props: Props) {
    return (
        <div className="alert fixed bottom-0 bg-teal-100 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Complete your profile</span>
            <div>
                <button onClick={props.denyFn} className="btn btn-sm btn-error glass">Deny</button>
                <button onClick={props.acceptFn} className="btn btn-sm btn-info glass">Accept</button>
            </div>
        </div>
    );
}
