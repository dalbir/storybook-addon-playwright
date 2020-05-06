import React, { SFC, useCallback } from 'react';
import { ActionMenu } from './ActionMenu';
import { IconButton } from '@storybook/components';
import AddIcon from '@material-ui/icons/AddSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';
import SaveIcon from '@material-ui/icons/SaveSharp';
import { Toolbar, ActionPopover } from '../../common';

export interface ActionToolbarProps {
  onAddAction: (actionName: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const ActionToolbar: SFC<ActionToolbarProps> = (props) => {
  const { onAddAction, onClose, onSave } = props;

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMEnuChange = useCallback(
    (action: string) => {
      onAddAction(action);
      setMenuAnchorEl(null);
    },
    [onAddAction],
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Toolbar border={['bottom']}>
        <div className="left">
          <IconButton onClick={handleMenuOpen} title="Add Actions">
            <AddIcon />
          </IconButton>
        </div>
        <div className="right">
          <IconButton title="Save Actions" onClick={onSave}>
            <SaveIcon />
          </IconButton>
          <IconButton title="Close" onClick={handleClick}>
            <CloseIcon />
          </IconButton>
        </div>
      </Toolbar>

      <ActionMenu
        onClose={handleMenuClose}
        anchorEl={menuAnchorEl}
        onChange={handleMEnuChange}
      />
      {anchorEl && (
        <ActionPopover open={anchorEl !== undefined} anchorEl={anchorEl}>
          Are you sure?
        </ActionPopover>
      )}
    </>
  );
};

ActionToolbar.displayName = 'ActionToolbar';

export { ActionToolbar };
