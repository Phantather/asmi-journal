import { FC, useEffect, useState } from 'react';

// import { useUser } from '~entities/shared/user';
import { PasswordEditView } from '~features/shared/password';

export interface PasswordChangeProps {}

export const PasswordChange: FC<PasswordChangeProps> = () => {
  // const user = useUser();

  return (
    <div className="w-[60%] md:w-[80%] sm:w-full">
      <PasswordEditView />
    </div>
  );
};
