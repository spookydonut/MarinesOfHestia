import { act } from '../byond';
import { Button, LabeledList, ProgressBar, Section } from '../components';

export const DisposalUnit = props => {
  const { state } = props;
  const { config, data } = state;
  const { ref } = config;
  let stateColor;
  let stateText;
  if (data.full_pressure) {
    stateColor = 'good';
    stateText = 'Ready';
  }
  else if (data.panel_open) {
    stateColor = 'bad';
    stateText = 'Power Disabled';
  }
  else if (data.pressure_charging) {
    stateColor = 'average';
    stateText = 'Pressurizing';
  }
  else {
    stateColor = 'bad';
    stateText = 'Off';
  }
  return (
    <Section>
      <LabeledList>
        <LabeledList.Item
          label="State"
          color={stateColor}>
          {stateText}
        </LabeledList.Item>
        <LabeledList.Item
          label="Pressure">
          <ProgressBar
            value={data.per}
            color="good" />
        </LabeledList.Item>
        <LabeledList.Item
          label="Handle">
          <Button
            icon={data.flush ? 'toggle-on' : 'toggle-off'}
            disabled={data.isai || data.panel_open}
            content={data.flush ? 'Disengage' : 'Engage'}
            onClick={() => act(ref, data.flush ? 'handle-0' : 'handle-1')}
          />
        </LabeledList.Item>
        <LabeledList.Item
          label="Eject">
          <Button
            icon="sign-out-alt"
            disabled={data.isai}
            content="Eject Contents"
            onClick={() => act(ref, 'eject')} />
        </LabeledList.Item>
        <LabeledList.Item
          label="Power">
          <Button
            icon="power-off"
            disabled={data.panel_open}
            selected={data.pressure_charging}
            onClick={() => act(ref,
              data.pressure_charging ? 'pump-0' : 'pump-1')}
          />
        </LabeledList.Item>
      </LabeledList>
    </Section>
  );
};
