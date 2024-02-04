let confidence = 5;

const endeavors = [
  { id: '1', name: 'Get wealthy' },
  { id: '2', name: 'Get famous' },
]

const activities = [
  { id: '3', name: 'Squats', amount: "10 reps", diff: 5 },
  { id: '4', name: 'Lunges', amount: "10 reps", diff: 5 },
  { id: '5', name: 'Dips', amount: "10 reps", diff: 5 },
  { id: '6', name: 'Sit-ups', amount: "10 reps", diff: 5 },
  { id: '7', name: 'Planks', amount: "10 reps", diff: 5 },
  { id: '8', name: 'Jumping Jacks', amount: "10 reps", diff: 5 },
  { id: '9', name: 'Burpees', amount: "10 reps", diff: 5 },
  { id: '10', name: 'Mountain Climbers', amount: "10 reps", diff: 5 },
  { id: '11', name: 'Push-ups', amount: "10 reps", diff: 5 },
  { id: '12', name: 'Pull-ups', amount: "10 reps", diff: 5 },
]

const quests = [
  { id: '13', activityId: '3', startDate: '2024-01-20', actsPlanned: 5, diff: 5, status: 'active' },
  { id: '14', activityId: '4', startDate: '2024-01-19', actsPlanned: 2, diff: 5, status: 'complete' },
]

const acts = [
  { id: '15', questId: '13', date: '2024-01-20', status: 'done', reward: 1 },
  { id: '16', questId: '13', date: '2024-01-21', status: 'done', reward: 1 },
  { id: '17', questId: '13', date: '2024-01-22', status: 'done', reward: 1 },
  { id: '18', questId: '13', date: '2024-01-23', status: 'planned', reward: 1 },
  { id: '19', questId: '13', date: '2024-01-24', status: 'planned', reward: 1 },
  { id: '20', questId: '14', date: '2024-01-19', status: 'done', reward: 1 },
  { id: '21', questId: '14', date: '2024-01-20', status: 'done', reward: 1 },
  { id: '22', questId: '14', date: '2024-01-21', status: 'planned', reward: 1 },
]

let lastId = 12;
let currentView = 'confidence';

const {
  showConfidence,
  hideConfidence,
  fillConfidence,
  onUpdateConfidence,
  onShiftConfidence,
} = prepareConfidenceView();

const {
  updateViewSelect,
  onChangeView,
} = prepareViewSelect();

const {
  showAddEndeavor,
  hideAddEndeavor,
  fillAddEndeavor,
  onAddEndeavor,
  selectEndeavorAdd,
} = prepareAddEndeavorView();

const {
  showEndeavors,
  hideEndeavors,
  fillEndeavors,
  onEditEndeavor,
  onRemoveEndeavor,
  onDuplicateEndeavor,
  onRemoveAllEndeavors,
  onSwitchToAddEndeavor,
} = prepareEndeavorsView();

const {
  showEditEndeavor,
  hideEditEndeavor,
  fillEditEndeavor,
  selectEndeavorEdit,
  onUpdateEndeavor,
} = prepareEditEndeavorView();

const {
  showAddActivity,
  hideAddActivity,
  fillAddActivity,
  onAddActivity,
  selectActivityAdd,
} = prepareAddActivityView();

const {
  showActivities,
  hideActivities,
  fillActivities,
  onEditActivity,
  onRemoveActivity,
  onDuplicateActivity,
  onRemoveAllActivities,
  onSwitchToAddActivity,
} = prepareActivitiesView();

const {
  showEditActivity,
  hideEditActivity,
  fillEditActivity,
  selectActivityEdit,
  onUpdateActivity,
} = prepareEditActivityView();

const {
  showQuests,
  hideQuests,
  fillQuests,
  onViewQuest,
  onViewSimilarQuests,
  onDuplicateQuest,
  onViewAllQuests,
  onViewActiveQuests,
  onViewFinishedQuests,
  onViewFailedQuests,
  onSwitchToTakeQuest,
} = prepareQuestsView();

const {
  showQuest,
  hideQuest,
  fillQuest,
} = prepareQuestView();

const switchViewFuncDict = {
  'confidence': {
    show: showConfidence,
    hide: hideConfidence,
  },
  'add-endeavor': {
    show: showAddEndeavor,
    hide: hideAddEndeavor,
  },
  'endeavors': {
    show: showEndeavors,
    hide: hideEndeavors,
  },
  'edit-endeavor': {
    show: showEditEndeavor,
    hide: hideEditEndeavor,
  },
  'add-activity': {
    show: showAddActivity,
    hide: hideAddActivity,
  },
  'activities': {
    show: showActivities,
    hide: hideActivities,
  },
  'edit-activity': {
    show: showEditActivity,
    hide: hideEditActivity,
  },
  'quests': {
    show: showQuests,
    hide: hideQuests,
  },
  'quest': {
    show: showQuest,
    hide: hideQuest,
  },
};

onChangeView(switchView);

onUpdateConfidence(updateConfidence);
onShiftConfidence(shiftConfidence);
onAddEndeavor(addEndeavor);
onEditEndeavor(editEndeavor);
onRemoveEndeavor(removeEndeavor);
onDuplicateEndeavor(duplicateEndeavor);
onRemoveAllEndeavors(removeAllEndeavors);
onSwitchToAddEndeavor(switchToAddEndeavor);
onUpdateEndeavor(updateEndeavor);

onAddActivity(addActivity);
onEditActivity(editActivity);
onRemoveActivity(removeActivity);
onDuplicateActivity(duplicateActivity);
onRemoveAllActivities(removeAllActivities);
onSwitchToAddActivity(switchToAddActivity);
onUpdateActivity(updateActivity);

fillConfidence(confidence);
fillAddEndeavor(endeavors);
fillEndeavors(endeavors);
fillEditEndeavor(endeavors);
fillAddActivity(activities);
fillActivities(activities);
fillEditActivity(activities);
fillQuests(quests);
fillQuest(quests, acts);

// switchView('add-endeavor');
// switchView('endeavors');
// switchView('edit-endeavor');
// switchView('activities');
// switchView('confidence');
// switchView('quests');
switchView('quest');

function updateConfidence(newConfidence) {
  confidence = newConfidence;

  fillConfidence(confidence);
}

function shiftConfidence(shift) {
  if (confidence + shift < 0) {
    throw new Error(`Confidence can't be negative!`);
  }

  confidence += shift;

  fillConfidence(confidence);
}

function addEndeavor(name) {
  if (endeavors.some(endeavor => endeavor.name === name)) {
    throw new Error(`Endeavor "${name}" already exists!`);
  }

  const id = genNewId();
  const newEndeavor = { id, name };

  endeavors.unshift(newEndeavor);

  fillAddEndeavor(endeavors);
  fillEditEndeavor(endeavors);
  fillEndeavors(endeavors);

  return id;
}

function editEndeavor(id) {
  const endeavor = endeavors.find(endeavor => endeavor.id === id);

  if (!endeavor) {
    throw new Error(`Endeavor with id "${id}" not found!`);
  }

  switchView('edit-endeavor');
  selectEndeavorEdit(id);
}

function removeEndeavor(id) {
  const endeavor = endeavors.find(endeavor => endeavor.id === id);

  if (!endeavor) {
    throw new Error(`Endeavor with id "${id}" not found!`);
  }

  endeavors.splice(endeavors.indexOf(endeavor), 1);

  fillAddEndeavor(endeavors);
  fillEditEndeavor(endeavors);
  fillEndeavors(endeavors);
}

function duplicateEndeavor(id) {
  const endeavor = endeavors.find(endeavor => endeavor.id === id);

  if (!endeavor) {
    throw new Error(`Endeavor with id "${id}" not found!`);
  }

  switchView('add-endeavor');
  selectEndeavorAdd(id);
}

function removeAllEndeavors() {
  endeavors.splice(0);

  fillAddEndeavor(endeavors);
  fillEditEndeavor(endeavors);
  fillEndeavors(endeavors);
}

function switchToAddEndeavor() {
  switchView('add-endeavor');
}

function updateEndeavor(id, newName) {
  const endeavor = endeavors.find(endeavor => endeavor.id === id);

  if (!endeavor) {
    throw new Error(`Endeavor with id "${id}" not found!`);
  }

  if (endeavors.some(endeavor => endeavor.name === newName)) {
    throw new Error(`Endeavor "${newName}" already exists!`);
  }

  endeavor.name = newName;

  fillAddEndeavor(endeavors);
  fillEditEndeavor(endeavors);
  fillEndeavors(endeavors);
}

function addActivity(name, amount, diff) {
  if (activities.some(activity => activity.name === name && activity.amount === amount)) {
    throw new Error(`Activity "${name}, ${amount}" already exists!`);
  }

  const id = genNewId();
  const newActivity = { id, name, amount, diff };

  activities.unshift(newActivity);

  fillAddActivity(activities);
  fillActivities(activities);
  fillEditActivity(activities);
}

function editActivity(id) {
  const activity = activities.find(activity => activity.id === id);

  if (!activity) {
    throw new Error(`Activity with id "${id}" not found!`);
  }

  switchView('edit-activity');
  selectActivityEdit(id);
}

function removeActivity(id) {
  const activity = activities.find(activity => activity.id === id);

  if (!activity) {
    throw new Error(`Activity with id "${id}" not found!`);
  }

  activities.splice(activities.indexOf(activity), 1);

  fillAddActivity(activities);
  fillActivities(activities);
  fillEditActivity(activities);
}

function duplicateActivity(id) {
  const activity = activities.find(activity => activity.id === id);

  if (!activity) {
    throw new Error(`Activity with id "${id}" not found!`);
  }

  switchView('add-activity');
  selectActivityAdd(id);
}

function removeAllActivities() {
  activities.splice(0);

  fillAddActivity(activities);
  fillActivities(activities);
  fillEditActivity(activities);
}

function switchToAddActivity() {
  switchView('add-activity');
}

function updateActivity(id, newName, newAmount, newDiff) {
  const activity = activities.find(activity => activity.id === id);

  if (!activity) {
    throw new Error(`Activity with id "${id}" not found!`);
  }

  if (activities.some(a => a != activity && a.name === newName && a.amount === newAmount)) {
    throw new Error(`Activity "${newName}, ${newAmount}" already exists!`);
  }

  activity.name = newName;
  activity.amount = newAmount;
  activity.diff = newDiff;

  fillAddActivity(activities);
  fillActivities(activities);
  fillEditActivity(activities);
}

function genNewId() {
  return (++lastId).toString();
}

function prepareConfidenceView() {
  const confidenceContainer = document.getElementById('confidence-view');
  const [confidenceForm, shiftForm] = confidenceContainer.querySelectorAll('form');
  const [confidenceInput, shiftInput] = confidenceContainer.querySelectorAll('input');
  const updateBtn = confidenceForm.querySelector('button');
  const shiftBtn = shiftForm.querySelector('button');
  const updateBtnDecoratorDict = prepStatusBtn(updateBtn);
  const shiftBtnDecoratorDict = prepStatusBtn(shiftBtn);

  confidenceInput.value = '';

  hideConfidence();

  function showConfidence() {
    confidenceContainer.hidden = false;
  }

  function hideConfidence() {
    confidenceContainer.hidden = true;
    updateBtnDecoratorDict.turnOff();
    shiftBtnDecoratorDict.turnOff();
  }

  function fillConfidence(confidence) {
    confidenceInput.value = confidence;
  }

  function onUpdateConfidence(updateConfidence) {
    confidenceForm.onsubmit = async () => {
      const newConfidence = confidenceInput.value;
      const { acknowledge, complaint, report } = updateBtnDecoratorDict;

      try {
        acknowledge(`Trying to update confidence...`);
        await updateConfidence(newConfidence);
        report(`Confidence updated successfully!`);
      } catch (error) {
        complaint(`Failed to update. ${error.message}`);
      }
    }
  }

  function onShiftConfidence(shiftConfidence) {
    shiftForm.onsubmit = async () => {
      const shift = +shiftInput.value;
      const { acknowledge, complaint, report } = shiftBtnDecoratorDict;

      try {
        acknowledge(`Trying to shift confidence...`);
        await shiftConfidence(shift);
        report(`Confidence shifted successfully!`);

        shiftInput.value = '0';
      } catch (error) {
        complaint(`Failed to shift. ${error.message}`);
      }
    }
  }

  return {
    showConfidence,
    hideConfidence,
    fillConfidence,
    onUpdateConfidence,
    onShiftConfidence,
  };
}

function prepareViewSelect() {
  const viewForm = document.getElementById('view-form');
  const viewSelect = viewForm.querySelector('select');

  function updateViewSelect() {
    viewSelect.value = currentView;
    viewSelect.title = `Current view:    ${currentView.replace(/-/g, ' ')}`;
  }

  function onChangeView(changeView) {
    viewForm.onsubmit = () => {
      changeView(viewSelect.value);
    };
  }

  return {
    updateViewSelect,
    onChangeView,
  };
}

function prepareAddEndeavorView() {
  const addEndeavorContainer = document.getElementById('add-endeavor-view');
  const [endeavorSelect, endeavorNameInput] = addEndeavorContainer.querySelectorAll('select, input');
  const buildEndeavorOption = (() => {
    const optionTemplate = endeavorSelect.querySelector('option');

    endeavorSelect.replaceChildren();
    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildEndeavorOption(action) {
      const option = optionTemplate.cloneNode(true);

      option.setAttribute('value', action.id);
      option.append(action.name);

      return option;
    }
  })();
  const submitBtn = addEndeavorContainer.querySelector('button');

  const { acknowledge, complaint, report, turnOff } = prepStatusBtn(submitBtn);

  endeavorNameInput.value = '';

  hideAddEndeavor();

  function showAddEndeavor() {
    addEndeavorContainer.hidden = false;
  }

  function hideAddEndeavor() {
    addEndeavorContainer.hidden = true;
    turnOff();
  }

  function fillAddEndeavor(actions) {
    endeavorSelect.replaceChildren(...actions.map(buildEndeavorOption));
  }

  function onAddEndeavor(addEndeavor) {
    addEndeavorContainer.onsubmit = async () => {
      const newEndeavorName = endeavorNameInput.value;

      try {
        acknowledge(`Trying to add endeavor "${newEndeavorName}"...`);
        const id = await addEndeavor(newEndeavorName);
        report(`Endeavor "${newEndeavorName}" added successfully!`);
        endeavorNameInput.value = '';
        endeavorSelect.value = id;
      } catch (error) {
        complaint(`Failed to add. ${error.message}`);
      }
    };
  }

  function selectEndeavorAdd(id) {
    endeavorSelect.value = id;
    const value = endeavorSelect.selectedOptions[0].textContent;
    endeavorNameInput.setAttribute('value', value);
    endeavorNameInput.value = value;
    endeavorNameInput.focus();
    endeavorNameInput.select();
  }

  return {
    showAddEndeavor,
    hideAddEndeavor,
    fillAddEndeavor,
    onAddEndeavor,
    selectEndeavorAdd,
  };
}

function prepareEndeavorsView() {
  const endeavorsContainer = document.getElementById('endeavors-view');
  const [endeavorForm, nonSpecificForm] = endeavorsContainer.querySelectorAll('form');
  const [endeavorsSelect, endeavorActionSelect, nonSpecificActionSelect] = endeavorsContainer.querySelectorAll('select');
  const buildEndeavorOption = (() => {
    const optionTemplate = endeavorsSelect.querySelector('option');

    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildEndeavorOption(endeavor) {
      const option = optionTemplate.cloneNode(true);

      option.setAttribute('value', endeavor.id);
      option.append(endeavor.name);

      return option;
    }
  })();
  const endeavorActionBtn = endeavorForm.querySelector('button');
  const nonSpecificActionBtn = nonSpecificForm.querySelector('button');
  const endeavorActionBtnDecoratorDict = prepStatusBtn(endeavorActionBtn);
  const nonSpecificActionBtnDecoratorDict = prepStatusBtn(nonSpecificActionBtn);

  let editEndeavor, removeEndeavor, duplicateEndeavor;
  let removeAllEndeavors, switchToAddEndeavor;

  hideEndeavors();

  endeavorForm.onsubmit = () => {
    const id = endeavorsSelect.value;
    const name = endeavorsSelect.selectedOptions[0].textContent;
    const action = endeavorActionSelect.value;

    if (action === 'edit') {
      editEndeavor?.(id);
    } else if (action === 'remove' && removeEndeavor) {
      handleRemove(id, name);
    } else if (action === 'duplicate') {
      duplicateEndeavor?.(id);
    }
  }

  nonSpecificForm.onsubmit = () => {
    const action = nonSpecificActionSelect.value;

    if (action === 'remove-all' && removeAllEndeavors) {
      handleRemoveAll();
    } else if (action === 'add') {
      switchToAddEndeavor?.();
    }
  }

  function showEndeavors() {
    endeavorsContainer.hidden = false;
  }

  function hideEndeavors() {
    endeavorsContainer.hidden = true;
    endeavorActionBtnDecoratorDict.turnOff();
    nonSpecificActionBtnDecoratorDict.turnOff();
  }

  function fillEndeavors(endeavors) {
    endeavorsSelect.replaceChildren(...endeavors.map(buildEndeavorOption));

    const noEndeavors = endeavors.length === 0;

    endeavorForm.hidden = noEndeavors;
    endeavorForm.nextElementSibling.hidden = noEndeavors;
  }

  function onEditEndeavor(handler) {
    editEndeavor = handler;
  }

  function onRemoveEndeavor(handler) {
    removeEndeavor = handler;
  }

  function onDuplicateEndeavor(handler) {
    duplicateEndeavor = handler;
  }

  function onRemoveAllEndeavors(handler) {
    removeAllEndeavors = handler;
  }

  function onSwitchToAddEndeavor(handler) {
    switchToAddEndeavor = handler;
  }

  async function handleRemove(id, name) {
    const { acknowledge, complaint, report } = endeavorActionBtnDecoratorDict;

    try {
      acknowledge(`Trying to remove endeavor "${name}"...`);
      await removeEndeavor(id);
      report(`Endeavor "${name}" removed successfully!`);
    } catch (error) {
      complaint(`Failed to remove. ${error.message}`);
    }
  }

  async function handleRemoveAll() {
    const { acknowledge, complaint, report } = nonSpecificActionBtnDecoratorDict;

    try {
      acknowledge(`Trying to remove all endeavors...`);
      await removeAllEndeavors();
      report(`All endeavors removed successfully!`);
    } catch (error) {
      complaint(`Failed to remove. ${error.message}`);
    }
  }

  return {
    showEndeavors,
    hideEndeavors,
    fillEndeavors,
    onEditEndeavor,
    onRemoveEndeavor,
    onDuplicateEndeavor,
    onRemoveAllEndeavors,
    onSwitchToAddEndeavor,
  };
}

function prepareEditEndeavorView() {
  const editEndeavorContainer = document.getElementById('edit-endeavor-view');
  const editEndeavorForm = editEndeavorContainer.querySelector('form');
  const [endeavorSelect, endeavorNameInput, actionSelect,] = editEndeavorForm.querySelectorAll('select, input');
  const buildEndeavorOption = (() => {
    const optionTemplate = endeavorSelect.querySelector('option');

    endeavorSelect.replaceChildren();
    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildEndeavorOption(endeavor) {
      const option = optionTemplate.cloneNode(true);

      option.setAttribute('value', endeavor.id);
      option.append(endeavor.name);

      return option;
    }
  })();
  const submitBtn = editEndeavorForm.querySelector('button');
  const { acknowledge, complaint, report, turnOff } = prepStatusBtn(submitBtn);

  let updateEndeavor;

  endeavorSelect.onchange = () => {
    selectEndeavorEdit();
  }

  editEndeavorForm.onsubmit = () => {
    const action = actionSelect.value;

    if (action === 'update') {
      const id = endeavorSelect.value;
      const name = endeavorSelect.selectedOptions[0].textContent;
      const newName = endeavorNameInput.value;

      handleUpdate(id, name, newName);
    } else if (action === 'reset') {
      resetEndeavor();
    }
  }

  hideEditEndeavor();

  function showEditEndeavor() {
    editEndeavorContainer.hidden = false;
  }

  function hideEditEndeavor() {
    editEndeavorContainer.hidden = true;
    turnOff();
  }

  function fillEditEndeavor(endeavors) {
    endeavorSelect.replaceChildren(...endeavors.map(buildEndeavorOption));

    const noEndeavors = endeavors.length === 0;

    editEndeavorForm.hidden = noEndeavors;

    if (!noEndeavors) selectEndeavorEdit()
  }

  function selectEndeavorEdit(id) {
    endeavorSelect.value = id || endeavorSelect.value;
    const value = endeavorSelect.selectedOptions[0].textContent;
    endeavorNameInput.setAttribute('value', value);
    endeavorNameInput.value = value;
    endeavorNameInput.focus();
    endeavorNameInput.select();
  }

  function onUpdateEndeavor(handler) {
    updateEndeavor = handler;
  }

  async function handleUpdate(id, name, newName) {
    try {
      acknowledge(`Trying to update endeavor "${name}"...`);
      await updateEndeavor(id, newName);
      report(`Endeavor "${newName}" updated successfully!`);
      selectEndeavorEdit(id);
    } catch (error) {
      complaint(`Failed to update. ${error.message}`);
    }
  }

  function resetEndeavor() {
    endeavorNameInput.value = endeavorNameInput.getAttribute('value');
    endeavorNameInput.focus();
    endeavorNameInput.select();
  }

  return {
    showEditEndeavor,
    hideEditEndeavor,
    fillEditEndeavor,
    selectEndeavorEdit,
    onUpdateEndeavor,
  };
}

function prepareAddActivityView() {
  const addActivityContainer = document.getElementById('add-activity-view');
  const [activitySelect, activityNameInput, activityAmountInput, activityDiffInput] = addActivityContainer.querySelectorAll('select, input');
  const buildActivityOption = (() => {
    const optionTemplate = activitySelect.querySelector('option');

    activitySelect.replaceChildren();
    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildActivityOption(activity) {
      const option = optionTemplate.cloneNode(true);

      option.setAttribute('value', activity.id);
      option.append(`${activity.name}, ${activity.amount}, ${activity.diff}`);

      return option;
    }
  })();
  const submitBtn = addActivityContainer.querySelector('button');
  const { acknowledge, complaint, report, turnOff } = prepStatusBtn(submitBtn);

  activityNameInput.value = '';
  activityAmountInput.value = '';
  activityDiffInput.value = '';

  hideAddActivity();

  function showAddActivity() {
    addActivityContainer.hidden = false;
  }

  function hideAddActivity() {
    addActivityContainer.hidden = true;
    turnOff();
  }

  function fillAddActivity(activities) {
    activitySelect.replaceChildren(...activities.map(buildActivityOption));
  }

  function onAddActivity(addActivity) {
    addActivityContainer.onsubmit = async () => {
      const newActivityName = activityNameInput.value;
      const newActivityAmount = activityAmountInput.value;
      const newActivityDiff = activityDiffInput.value;

      try {
        acknowledge(`Trying to add activity "${newActivityName}"...`);
        await addActivity(newActivityName, newActivityAmount, newActivityDiff);
        report(`Activity "${newActivityName}" added successfully!`);
        activityNameInput.value = '';
        activityAmountInput.value = '';
        activityDiffInput.value = '';
      } catch (error) {
        complaint(`Failed to add. ${error.message}`);
      }
    };
  }

  function selectActivityAdd(id) {
    activitySelect.value = id || activitySelect.value;

    const value = activitySelect.selectedOptions[0].textContent;
    const [name, amount, diff] = value.split(', ');

    activityNameInput.setAttribute('value', name);
    activityNameInput.value = name;

    activityAmountInput.setAttribute('value', amount);
    activityAmountInput.value = amount;

    activityDiffInput.setAttribute('value', diff);
    activityDiffInput.value = diff;

    activityNameInput.focus();
    activityNameInput.select();
  }

  return {
    showAddActivity,
    hideAddActivity,
    fillAddActivity,
    onAddActivity,
    selectActivityAdd,
  };
}

function prepareActivitiesView() {
  const activitiesContainer = document.getElementById('activities-view');
  const [activityForm, nonSpecificForm] = activitiesContainer.querySelectorAll('form');
  const [activitiesSelect, activityActionSelect, nonSpecificActionSelect] = activitiesContainer.querySelectorAll('select');
  const buildActivityOption = (() => {
    const optionTemplate = activitiesSelect.querySelector('option');

    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildActivityOption(activity) {
      const option = optionTemplate.cloneNode(true);

      option.setAttribute('value', activity.id);
      option.append(`${activity.name}, ${activity.amount}, ${activity.diff}`);

      return option;
    }
  })();
  const activityActionBtn = activityForm.querySelector('button');
  const nonSpecificActionBtn = nonSpecificForm.querySelector('button');
  const activityActionBtnDecoratorDict = prepStatusBtn(activityActionBtn);
  const nonSpecificActionBtnDecoratorDict = prepStatusBtn(nonSpecificActionBtn);

  let editActivity, removeActivity, duplicateActivity;
  let removeAllActivities, switchToAddActivity;

  hideActivities();

  activityForm.onsubmit = () => {
    const id = activitiesSelect.value;
    const name = activitiesSelect.selectedOptions[0].textContent;
    const action = activityActionSelect.value;

    if (action === 'edit') {
      editActivity?.(id);
    } else if (action === 'remove' && removeActivity) {
      handleRemove(id, name);
    } else if (action === 'duplicate') {
      duplicateActivity?.(id);
    }
  }

  nonSpecificForm.onsubmit = () => {
    const action = nonSpecificActionSelect.value;

    if (action === 'remove-all' && removeAllActivities) {
      handleRemoveAll();
    } else if (action === 'add') {
      switchToAddActivity?.();
    }
  }

  function showActivities() {
    activitiesContainer.hidden = false;
  }

  function hideActivities() {
    activitiesContainer.hidden = true;
    activityActionBtnDecoratorDict.turnOff();
    nonSpecificActionBtnDecoratorDict.turnOff();
  }

  function fillActivities(activities) {
    activitiesSelect.replaceChildren(...activities.map(buildActivityOption));

    const noActivities = activities.length === 0;

    activityForm.hidden = noActivities;
    activityForm.nextElementSibling.hidden = noActivities;
  }

  function onEditActivity(handler) {
    editActivity = handler;
  }

  function onRemoveActivity(handler) {
    removeActivity = handler;
  }

  function onDuplicateActivity(handler) {
    duplicateActivity = handler;
  }

  function onRemoveAllActivities(handler) {
    removeAllActivities = handler;
  }

  function onSwitchToAddActivity(handler) {
    switchToAddActivity = handler;
  }

  async function handleRemove(id, name) {
    const { acknowledge, complaint, report } = activityActionBtnDecoratorDict;

    try {
      acknowledge(`Trying to remove activity "${name}"...`);
      await removeActivity(id);
      report(`Activity "${name}" removed successfully!`);
    } catch (error) {
      complaint(`Failed to remove. ${error.message}`);
    }
  }

  async function handleRemoveAll() {
    const { acknowledge, complaint, report } = nonSpecificActionBtnDecoratorDict;

    try {
      acknowledge(`Trying to remove all activities...`);
      await removeAllActivities();
      report(`All activities removed successfully!`);
    } catch (error) {
      complaint(`Failed to remove. ${error.message}`);
    }
  }

  return {
    showActivities,
    hideActivities,
    fillActivities,
    onEditActivity,
    onRemoveActivity,
    onDuplicateActivity,
    onRemoveAllActivities,
    onSwitchToAddActivity,
  };
}

function prepareEditActivityView() {
  const editActivityContainer = document.getElementById('edit-activity-view');
  const editActivityForm = editActivityContainer.querySelector('form');
  const [activitySelect, activityNameInput, activityAmountInput, activityDiffInput, actionSelect,] = editActivityForm.querySelectorAll('select, input');
  const buildActivityOption = (() => {
    const optionTemplate = activitySelect.querySelector('option');

    activitySelect.replaceChildren();
    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildActivityOption(activity) {
      const option = optionTemplate.cloneNode(true);

      option.setAttribute('value', activity.id);
      option.append(`${activity.name}, ${activity.amount}, ${activity.diff}`);

      return option;
    }
  })();
  const submitBtn = editActivityForm.querySelector('button');
  const { acknowledge, complaint, report, turnOff } = prepStatusBtn(submitBtn);

  let updateActivity;

  activitySelect.onchange = () => {
    selectActivityEdit();
  }

  editActivityForm.onsubmit = () => {
    const action = actionSelect.value;

    if (action === 'update') {
      const id = activitySelect.value;
      const name = activitySelect.selectedOptions[0].textContent;
      const newName = activityNameInput.value;
      const newAmount = activityAmountInput.value;
      const newDiff = activityDiffInput.value;

      handleUpdate(id, name, newName, newAmount, newDiff);
    } else if (action === 'reset') {
      resetActivity();
    }
  }

  hideEditActivity();

  function showEditActivity() {
    editActivityContainer.hidden = false;
  }

  function hideEditActivity() {
    editActivityContainer.hidden = true;
    turnOff();
  }

  function fillEditActivity(activities) {
    activitySelect.replaceChildren(...activities.map(buildActivityOption));

    const noActivities = activities.length === 0;

    editActivityForm.hidden = noActivities;

    if (!noActivities) selectActivityEdit()
  }

  function selectActivityEdit(id) {
    activitySelect.value = id || activitySelect.value;
    const value = activitySelect.selectedOptions[0].textContent;
    const [name, amount, diff] = value.split(', ');

    activityNameInput.setAttribute('value', name);
    activityNameInput.value = name;

    activityAmountInput.setAttribute('value', amount);
    activityAmountInput.value = amount;

    activityDiffInput.setAttribute('value', diff);
    activityDiffInput.value = diff;

    activityNameInput.focus();
    activityNameInput.select();
  }

  function onUpdateActivity(handler) {
    updateActivity = handler;
  }

  async function handleUpdate(id, name, newName, newAmount, newDiff) {
    try {
      acknowledge(`Trying to update activity "${name}"...`);
      await updateActivity(id, newName, newAmount, newDiff);
      report(`Activity "${newName}" updated successfully!`);
      selectActivityEdit(id);
    } catch (error) {
      complaint(`Failed to update. ${error.message}`);
    }
  }

  function resetActivity() {
    activityNameInput.value = activityNameInput.getAttribute('value');
    activityNameInput.focus();
    activityNameInput.select();
  }

  return {
    showEditActivity,
    hideEditActivity,
    fillEditActivity,
    selectActivityEdit,
    onUpdateActivity,
  };
}

function prepareQuestsView() {
  const questsContainer = document.getElementById('quests-view');
  const [questForm, nonSpecificForm] = questsContainer.querySelectorAll('form');
  const [questsSelect, questActionSelect, nonSpecificActionSelect] = questsContainer.querySelectorAll('select');
  const buildQuestOption = (() => {
    const optionTemplate = questsSelect.querySelector('option');

    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildQuestOption(quest) {
      const option = optionTemplate.cloneNode(true);
      const activity = activities.find(activity => activity.id === quest.activityId);
      const actsDone = acts.filter(act => act.questId === quest.id && act.status === 'done').length;
      const progress = Math.round(actsDone / quest.actsPlanned * 100);
      let pledge = quest.actsPlanned * quest.diff;

      if (quest.status !== 'complete') pledge = '-' + pledge;

      option.setAttribute('value', quest.id);
      option.append(`${activity.name}, ${activity.amount}, ${actsDone}/${quest.actsPlanned}, ${progress}%, ${pledge}`);

      return option;
    }
  })();
  const questActionBtn = questForm.querySelector('button');
  const nonSpecificActionBtn = nonSpecificForm.querySelector('button');
  const questActionBtnDecoratorDict = prepStatusBtn(questActionBtn);
  const nonSpecificActionBtnDecoratorDict = prepStatusBtn(nonSpecificActionBtn);

  let viewQuest, viewSimilarQuests, duplicateQuest;
  let viewAllQuests, viewActiveQuests, viewFinishedQuests, viewFailedQuests, switchToTakeQuest;

  hideQuests();

  questForm.onsubmit = () => {
    const id = questsSelect.value;
    const activityName = questsSelect.selectedOptions[0].textContent.split(', ')[0];
    const action = questActionSelect.value;

    if (action === 'details' && viewQuest) {
      handleViewDetails(id);
    } else if (action === 'same-activity' && viewSimilarQuests) {
      handleViewSimilar(id, activityName);
    } else if (action === 'recreate') {
      duplicateQuest?.(id);
    }
  }

  nonSpecificForm.onsubmit = () => {
    const action = nonSpecificActionSelect.value;

    if (action === 'all' && viewAllQuests) {
      handleViewAll();
    } else if (action === 'active' && viewActiveQuests) {
      handleViewActive();
    } else if (action === 'finished' && viewFinishedQuests) {
      handleViewFinished();
    } else if (action === 'failed' && viewFailedQuests) {
      handleViewFailed();
    } else if (action === 'new') {
      switchToTakeQuest?.();
    }
  }

  function showQuests() {
    questsContainer.hidden = false;
  }

  function hideQuests() {
    questsContainer.hidden = true;
    questActionBtnDecoratorDict.turnOff();
    nonSpecificActionBtnDecoratorDict.turnOff();
  }

  function fillQuests(quests) {
    questsSelect.replaceChildren(...quests.map(buildQuestOption));

    const noQuests = quests.length === 0;

    questForm.hidden = noQuests;
    questForm.nextElementSibling.hidden = noQuests;
  }

  function onViewQuest(handler) {
    viewQuest = handler;
  }

  function onViewSimilarQuests(handler) {
    viewSimilarQuests = handler;
  }

  function onDuplicateQuest(handler) {
    duplicateQuest = handler;
  }

  function onViewAllQuests(handler) {
    viewAllQuests = handler;
  }

  function onViewActiveQuests(handler) {
    viewActiveQuests = handler;
  }

  function onViewFinishedQuests(handler) {
    viewFinishedQuests = handler;
  }

  function onViewFailedQuests(handler) {
    viewFailedQuests = handler;
  }

  function onSwitchToTakeQuest(handler) {
    switchToTakeQuest = handler;
  }

  async function handleViewDetails(id) {
    const { acknowledge, complaint } = questActionBtnDecoratorDict;

    try {
      acknowledge(`Getting details of quest "${id}"...`);
      await viewQuest(id);
      switchView('quest');
    } catch (error) {
      complaint(`Failed to get quest details. ${error.message}`);
    }
  }

  async function handleViewSimilar(id, activityName) {
    const { acknowledge, complaint, report } = questActionBtnDecoratorDict;

    try {
      acknowledge(`Getting all quests for "${activityName}"...`);
      await viewSimilarQuests(id);
      report(`Viewing quests for "${activityName}" only!`);
    } catch (error) {
      complaint(`Failed to get quests for "${activityName}". ${error.message}`);
    }
  }

  async function handleViewAll() {
    const { acknowledge, complaint, report } = nonSpecificActionBtnDecoratorDict;

    try {
      acknowledge(`Getting all quests...`);
      await viewAllQuests();
      report(`Viewing all quests!`);
    } catch (error) {
      complaint(`Failed to get all quests. ${error.message}`);
    }
  }

  async function handleViewActive() {
    const { acknowledge, complaint, report } = nonSpecificActionBtnDecoratorDict;

    try {
      acknowledge(`Getting active quests...`);
      await viewActiveQuests();
      report(`Viewing active quests only!`);
    } catch (error) {
      complaint(`Failed to get active quests. ${error.message}`);
    }
  }

  async function handleViewFinished() {
    const { acknowledge, complaint, report } = nonSpecificActionBtnDecoratorDict;

    try {
      acknowledge(`Getting finished quests...`);
      await viewFinishedQuests();
      report(`Viewing finished quests only!`);
    } catch (error) {
      complaint(`Failed to get finished quests. ${error.message}`);
    }
  }

  async function handleViewFailed() {
    const { acknowledge, complaint, report } = nonSpecificActionBtnDecoratorDict;

    try {
      acknowledge(`Getting failed quests...`);
      await viewFailedQuests();
      report(`Viewing failed quests only!`);
    } catch (error) {
      complaint(`Failed to get failed quests. ${error.message}`);
    }
  }

  return {
    showQuests,
    hideQuests,
    fillQuests,
    onViewQuest,
    onViewSimilarQuests,
    onDuplicateQuest,
    onViewAllQuests,
    onViewActiveQuests,
    onViewFinishedQuests,
    onViewFailedQuests,
    onSwitchToTakeQuest,
  };
}

function prepareQuestView() {
  const questContainer = document.getElementById('quest-view');
  const questForm = questContainer.querySelector('form');
  const [questsSelect, actsSelect] = questContainer.querySelectorAll('select');
  const buildQuestOption = (() => {
    const optionTemplate = questsSelect.querySelector('option');

    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildQuestOption(quest) {
      const option = optionTemplate.cloneNode(true);
      const activity = activities.find(activity => activity.id === quest.activityId);
      const actsDone = acts.filter(act => act.questId === quest.id && act.status === 'done').length;
      const progress = Math.round(actsDone / quest.actsPlanned * 100);
      let pledge = quest.actsPlanned * quest.diff;

      if (quest.status !== 'complete') pledge = '-' + pledge;

      option.setAttribute('value', quest.id);
      option.append(`${activity.name}, ${activity.amount}, ${actsDone}/${quest.actsPlanned}, ${progress}%, ${pledge}`);

      return option;
    }
  })();
  const buildActOption = (() => {
    const optionTemplate = actsSelect.querySelector('option');

    optionTemplate.setAttribute('value', '');
    optionTemplate.replaceChildren();

    return function buildActOption(act) {
      const option = optionTemplate.cloneNode(true);
      const activity = activities.find(activity => activity.id === act.activityId);

      option.setAttribute('value', act.id);
      option.append(`${activity.name}, ${activity.amount}, ${act.status}`);

      return option;
    }
  })();
  const questActionBtn = questForm.querySelector('button');
  const { acknowledge, complaint, report, turnOff } = prepStatusBtn(questActionBtn);

  hideQuest();

  questForm.onsubmit = () => {
    const id = questsSelect.value;
    const activityName = questsSelect.selectedOptions[0].textContent.split(', ')[0];
    const action = questActionSelect.value;

    if (action === 'details' && viewQuest) {
      handleViewDetails(id);
    } else if (action === 'same-activity' && viewSimilarQuests) {
      handleViewSimilar(id, activityName);
    } else if (action === 'recreate') {
      duplicateQuest?.(id);
    }
  }

  function showQuest() {
    questContainer.hidden = false;
  }

  function hideQuest() {
    questContainer.hidden = true;
    turnOff();
  }

  function fillQuest(quests) {
    questSelect.replaceChildren(...quests.map(buildQuestOption));

    const noQuests = quests.length === 0;

    questForm.hidden = noQuests;
    questForm.nextElementSibling.hidden = noQuests;
  }

  return {
    showQuest,
    hideQuest,
    fillQuest,
  };
}


function switchView(view) {
  switchViewFuncDict[currentView].hide();
  switchViewFuncDict[view].show();
  currentView = view;
  updateViewSelect();
}

function prepStatusBtn(btn) {
  const dot = document.createElement('span');

  dot.hidden = true;
  dot.style = `
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `;
  btn.append(' ', dot);

  function acknowledge(message) {
    dot.hidden = false;
    btn.title = message;
    dot.style.backgroundColor = 'yellow';

    readyToTurnOff();
  }

  function complaint(message) {
    dot.hidden = false;
    btn.title = message;
    dot.style.backgroundColor = 'red';

    readyToTurnOff();
  }

  function report(message) {
    dot.hidden = false;
    btn.title = message;
    dot.style.backgroundColor = 'green';

    readyToTurnOff();
  }

  function readyToTurnOff() {
    btn.onmouseleave = () => {
      btn.onmouseenter = () => {
        setTimeout(turnOff, 5000);
      };
    };
  }

  function turnOff() {
    dot.hidden = true;
    btn.title = '';
    dot.style.backgroundColor = null;
    btn.onmouseenter = null;
    btn.onmouseleave = null;
  }

  return { acknowledge, complaint, report, turnOff };
}
