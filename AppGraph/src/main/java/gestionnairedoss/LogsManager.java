package gestionnairedoss;

public class LogsManager {
    private static Logs leLog;

    LogsManager(Logs leLog) {
        LogsManager.leLog = leLog;
    }

    public static Logs getLeLog() {
        return LogsManager.leLog;
    }

    public static void setLog(Logs unLog) {
        LogsManager.leLog = unLog;
    }
}
